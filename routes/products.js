const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isActive: true };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    let sortQuery = {};
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case 'price_asc':
          sortQuery.price = 1;
          break;
        case 'price_desc':
          sortQuery.price = -1;
          break;
        case 'name_asc':
          sortQuery.name = 1;
          break;
        case 'name_desc':
          sortQuery.name = -1;
          break;
        case 'rating':
          sortQuery.averageRating = -1;
          break;
        default:
          sortQuery.createdAt = -1;
      }
    } else {
      sortQuery.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', protect, admin, upload.array('images', 5), [
  body('name').notEmpty().trim(),
  body('description').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('category').isIn(['Category 1', 'Category 2', 'Category 3']),
  body('stock').isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, details, price, category, stock, deliveryTime, returnTime } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });
        images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    let stockStatus = 'In Stock';
    if (stock === 0) {
      stockStatus = 'Out of Stock';
    } else if (stock <= 10) {
      stockStatus = 'Low Stock';
    }

    const product = await Product.create({
      name,
      description,
      details,
      price,
      category,
      stock,
      stockStatus,
      deliveryTime: deliveryTime || '3-5 business days',
      returnTime: returnTime || '30 days',
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', protect, admin, upload.array('images', 5), [
  body('name').optional().notEmpty().trim(),
  body('description').optional().notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('category').optional().isIn(['Category 1', 'Category 2', 'Category 3']),
  body('stock').optional().isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, details, price, category, stock, deliveryTime, returnTime } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (details !== undefined) product.details = details;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) {
      product.stock = stock;
      if (stock === 0) {
        product.stockStatus = 'Out of Stock';
      } else if (stock <= 10) {
        product.stockStatus = 'Low Stock';
      } else {
        product.stockStatus = 'In Stock';
      }
    }
    if (deliveryTime) product.deliveryTime = deliveryTime;
    if (returnTime) product.returnTime = returnTime;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });
        product.images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: 'Product deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/ratings', protect, [
  body('rating').isInt({ min: 1, max: 5 }),
  body('review').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingRatingIndex = product.ratings.findIndex(
      rating => rating.user.toString() === req.user._id.toString()
    );

    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].rating = req.body.rating;
      product.ratings[existingRatingIndex].review = req.body.review;
      product.ratings[existingRatingIndex].date = new Date();
    } else {
      product.ratings.push({
        user: req.user._id,
        rating: req.body.rating,
        review: req.body.review,
      });
    }

    const totalRating = product.ratings.reduce((sum, item) => sum + item.rating, 0);
    product.averageRating = totalRating / product.ratings.length;
    product.totalReviews = product.ratings.length;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id/ratings', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.ratings = product.ratings.filter(
      rating => rating.user.toString() !== req.user._id.toString()
    );

    if (product.ratings.length > 0) {
      const totalRating = product.ratings.reduce((sum, item) => sum + item.rating, 0);
      product.averageRating = totalRating / product.ratings.length;
    } else {
      product.averageRating = 0;
    }
    product.totalReviews = product.ratings.length;

    await product.save();
    res.json({ message: 'Rating removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
