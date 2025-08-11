const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/auth');
const { sendEmail } = require('../config/email');

const router = express.Router();

const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `R${timestamp}${random}`;
};

router.post('/', protect, [
  body('items').isArray({ min: 1 }),
  body('items.*.product').isMongoId(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('deliveryAddress').isObject(),
  body('invoiceAddress').isObject(),
  body('deliveryDate').optional().isISO8601(),
  body('deliveryTime').optional().isString(),
  body('paymentMethod').isString(),
  body('orderType').optional().isIn(['purchase', 'rental']),
  body('rentalStartDate').optional().isISO8601(),
  body('rentalEndDate').optional().isISO8601(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      items,
      deliveryAddress,
      invoiceAddress,
      deliveryDate,
      deliveryTime,
      paymentMethod,
      orderType = 'purchase',
      rentalStartDate,
      rentalEndDate,
    } = req.body;

    let subTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(400).json({ message: `Product ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      subTotal += itemTotal;

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      });

      if (orderType === 'purchase') {
        product.stock -= item.quantity;
        if (product.stock === 0) {
          product.stockStatus = 'Out of Stock';
        } else if (product.stock <= 10) {
          product.stockStatus = 'Low Stock';
        }
        await product.save();
      }
    }

    const deliveryCharge = subTotal > 1000 ? 0 : 1000;
    const taxes = subTotal * 0.1;
    const grandTotal = subTotal + deliveryCharge + taxes;

    const order = await Order.create({
      orderId: generateOrderId(),
      user: req.user._id,
      items: orderItems,
      deliveryAddress,
      invoiceAddress,
      deliveryDate,
      deliveryTime,
      paymentMethod,
      orderStatus: 'Pending',
      orderType,
      subTotal,
      deliveryCharge,
      taxes,
      grandTotal,
      rentalStartDate,
      rentalEndDate,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'userName email')
      .populate('items.product', 'name price images');

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { user: req.user._id };
    if (req.user.role === 'admin') {
      query = {};
    }

    if (req.query.status) {
      query.orderStatus = req.query.status;
    }

    if (req.query.orderType) {
      query.orderType = req.query.orderType;
    }

    const orders = await Order.find(query)
      .populate('user', 'userName email')
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    let query = { _id: req.params.id };
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    const order = await Order.findOne(query)
      .populate('user', 'userName email phoneNo')
      .populate('items.product', 'name price images description');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/status', protect, admin, [
  body('orderStatus').isIn(['Pending', 'Ready', 'Pickup', 'Delivered', 'Return']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { orderStatus } = req.body;
    const previousStatus = order.orderStatus;
    order.orderStatus = orderStatus;

    if (orderStatus === 'Ready' && order.orderType === 'rental') {
      order.isConfirmed = true;
    }

    if (orderStatus === 'Return' && order.orderType === 'rental') {
      order.returnDate = new Date();
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          if (product.stock > 10) {
            product.stockStatus = 'In Stock';
          } else if (product.stock > 0) {
            product.stockStatus = 'Low Stock';
          }
          await product.save();
        }
      }
    }

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'userName email')
      .populate('items.product', 'name price images');

    const emailContent = `
      <h2>Order Status Update</h2>
      <p>Your order ${order.orderId} status has been updated from ${previousStatus} to ${orderStatus}.</p>
      <p>Order Details:</p>
      <ul>
        ${order.items.map(item => `<li>${item.product.name} - Qty: ${item.quantity}</li>`).join('')}
      </ul>
      <p>Total Amount: ₹${order.grandTotal}</p>
    `;

    try {
      await sendEmail({
        email: populatedOrder.user.email,
        subject: `Order Status Update - ${order.orderId}`,
        html: emailContent,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.orderStatus !== 'Pending') {
      return res.status(400).json({ message: 'Cannot cancel confirmed orders' });
    }

    if (order.orderType === 'purchase') {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          if (product.stock > 10) {
            product.stockStatus = 'In Stock';
          } else if (product.stock > 0) {
            product.stockStatus = 'Low Stock';
          }
          await product.save();
        }
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/dashboard/stats', protect, admin, async (req, res) => {
  try {
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const productStats = await Product.aggregate([
      {
        $group: {
          _id: '$stockStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const recentOrders = await Order.find({})
      .populate('user', 'userName')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderId user orderStatus grandTotal createdAt');

    const stats = {
      orderStatus: {},
      productStatus: {},
      recentOrders,
    };

    orderStats.forEach(stat => {
      stats.orderStatus[stat._id] = stat.count;
    });

    productStats.forEach(stat => {
      stats.productStatus[stat._id] = stat.count;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
