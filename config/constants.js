module.exports = {
  ORDER_STATUS: {
    PENDING: 'Pending',
    READY: 'Ready',
    PICKUP: 'Pickup',
    DELIVERED: 'Delivered',
    RETURN: 'Return',
  },

  ORDER_TYPE: {
    PURCHASE: 'purchase',
    RENTAL: 'rental',
  },

  PRODUCT_CATEGORIES: [
    'Category 1',
    'Category 2',
    'Category 3',
  ],

  STOCK_STATUS: {
    IN_STOCK: 'In Stock',
    OUT_OF_STOCK: 'Out of Stock',
    LOW_STOCK: 'Low Stock',
  },

  PAYMENT_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },

  NOTIFICATION_TYPES: {
    ORDER: 'order',
    PAYMENT: 'payment',
    DELIVERY: 'delivery',
    SYSTEM: 'system',
  },

  USER_ROLES: {
    USER: 'user',
    ADMIN: 'admin',
  },

  ADDRESS_TYPES: {
    DELIVERY: 'delivery',
    INVOICE: 'invoice',
  },

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  FILE_UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    MAX_IMAGES_PER_PRODUCT: 5,
  },

  RATE_LIMITING: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },

  JWT: {
    EXPIRES_IN: '7d',
  },

  CURRENCY: {
    CODE: 'INR',
    SYMBOL: '₹',
  },

  DELIVERY: {
    FREE_THRESHOLD: 1000, // Free delivery above ₹1000
    DEFAULT_CHARGE: 1000, // Default delivery charge
  },

  TAX: {
    RATE: 0.1, // 10% tax rate
  },
};
