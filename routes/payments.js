const express = require('express');
const { body, validationResult } = require('express-validator');
const stripe = require('../config/stripe');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const { sendEmail } = require('../config/email');

const router = express.Router();

router.post('/create-payment-intent', protect, [
  body('orderId').notEmpty(),
  body('amount').isFloat({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId, amount } = req.body;

    const order = await Order.findOne({ orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.paymentStatus === 'completed') {
      return res.status(400).json({ message: 'Payment already completed' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'inr',
      metadata: {
        orderId: order.orderId,
        userId: req.user._id.toString(),
      },
    });

    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/confirm-payment', protect, [
  body('paymentIntentId').notEmpty(),
  body('orderId').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentIntentId, orderId } = req.body;

    const order = await Order.findOne({ orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.stripePaymentIntentId !== paymentIntentId) {
      return res.status(400).json({ message: 'Invalid payment intent' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      order.paymentStatus = 'completed';
      await order.save();

      const populatedOrder = await Order.findById(order._id)
        .populate('user', 'userName email')
        .populate('items.product', 'name price images');

      const emailContent = `
        <h2>Payment Confirmed</h2>
        <p>Your payment for order ${order.orderId} has been confirmed successfully.</p>
        <p>Order Details:</p>
        <ul>
          ${order.items.map(item => `<li>${item.product.name} - Qty: ${item.quantity} - ₹${item.price}</li>`).join('')}
        </ul>
        <p>Sub Total: ₹${order.subTotal}</p>
        <p>Delivery Charge: ₹${order.deliveryCharge}</p>
        <p>Taxes: ₹${order.taxes}</p>
        <p><strong>Grand Total: ₹${order.grandTotal}</strong></p>
        <p>Thank you for your purchase!</p>
      `;

      try {
        await sendEmail({
          email: populatedOrder.user.email,
          subject: `Payment Confirmed - Order ${order.orderId}`,
          html: emailContent,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }

      res.json({ message: 'Payment confirmed successfully', order: populatedOrder });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
      if (order && order.paymentStatus !== 'completed') {
        order.paymentStatus = 'completed';
        await order.save();

        const populatedOrder = await Order.findById(order._id)
          .populate('user', 'userName email')
          .populate('items.product', 'name price images');

        const emailContent = `
          <h2>Payment Confirmed</h2>
          <p>Your payment for order ${order.orderId} has been confirmed successfully.</p>
          <p>Order Details:</p>
          <ul>
            ${order.items.map(item => `<li>${item.product.name} - Qty: ${item.quantity} - ₹${item.price}</li>`).join('')}
          </ul>
          <p>Sub Total: ₹${order.subTotal}</p>
          <p>Delivery Charge: ₹${order.deliveryCharge}</p>
          <p>Taxes: ₹${order.taxes}</p>
          <p><strong>Grand Total: ₹${order.grandTotal}</strong></p>
          <p>Thank you for your purchase!</p>
        `;

        try {
          await sendEmail({
            email: populatedOrder.user.email,
            subject: `Payment Confirmed - Order ${order.orderId}`,
            html: emailContent,
          });
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    
    try {
      const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
      if (order) {
        order.paymentStatus = 'failed';
        await order.save();

        const populatedOrder = await Order.findById(order._id)
          .populate('user', 'userName email');

        const emailContent = `
          <h2>Payment Failed</h2>
          <p>Your payment for order ${order.orderId} has failed.</p>
          <p>Please try again or contact support if the issue persists.</p>
        `;

        try {
          await sendEmail({
            email: populatedOrder.user.email,
            subject: `Payment Failed - Order ${order.orderId}`,
            html: emailContent,
          });
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  res.json({ received: true });
});

router.get('/payment-methods', protect, async (req, res) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: req.user._id,
      type: 'card',
    });

    res.json(paymentMethods.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/save-payment-method', protect, [
  body('paymentMethodId').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentMethodId } = req.body;

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: req.user._id,
    });

    res.json({ message: 'Payment method saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
