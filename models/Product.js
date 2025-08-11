const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Category 1', 'Category 2', 'Category 3'],
  },
  images: [{
    url: String,
    publicId: String,
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Low Stock'],
    default: 'In Stock',
  },
  deliveryTime: {
    type: String,
    default: '3-5 business days',
  },
  returnTime: {
    type: String,
    default: '30 days',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
