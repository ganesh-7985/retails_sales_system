const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  // Customer Fields
  customerId: {
    type: String,
    required: true,
    index: true
  },
  customerName: {
    type: String,
    required: true,
    index: true
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
    index: true
  },
  age: {
    type: Number,
    required: true,
    index: true
  },
  customerRegion: {
    type: String,
    required: true,
    index: true
  },
  customerType: {
    type: String,
    required: true
  },

  // Product Fields
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true,
    index: true
  },
  tags: {
    type: [String],
    default: [],
    index: true
  },

  // Sales Fields
  quantity: {
    type: Number,
    required: true,
    index: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  finalAmount: {
    type: Number,
    required: true
  },

  // Operational Fields
  date: {
    type: Date,
    required: true,
    index: true
  },
  paymentMethod: {
    type: String,
    required: true,
    index: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  deliveryType: {
    type: String,
    required: true
  },
  storeId: {
    type: String,
    required: true
  },
  storeLocation: {
    type: String,
    required: true
  },
  salespersonId: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create text index for full-text search on customerName and phoneNumber
saleSchema.index({ customerName: 'text', phoneNumber: 'text' });

// Compound indexes for common query patterns
saleSchema.index({ date: -1, customerName: 1 });
saleSchema.index({ customerRegion: 1, productCategory: 1 });

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
