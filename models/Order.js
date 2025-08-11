const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  deliveryAddress: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  invoiceAddress: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  deliveryDate: {
    type: Date,
  },
  deliveryTime: {
    type: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Ready', 'Pickup', 'Delivered', 'Return'],
    default: 'Pending',
  },
  orderType: {
    type: String,
    enum: ['purchase', 'rental'],
    default: 'purchase',
  },
  subTotal: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    default: 0,
  },
  taxes: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  stripePaymentIntentId: String,
  rentalStartDate: Date,
  rentalEndDate: Date,
  returnDate: Date,
  isConfirmed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

orderSchema.pre('save', function(next) {
  if (this.orderType === 'rental' && this.orderStatus === 'Ready') {
    this.isConfirmed = true;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
