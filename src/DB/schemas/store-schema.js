'use strict';
const mongoose = require('mongoose');

// store schema for storing stores
const store = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    category: {
      type: String,
      required: true,
      toLowerCase: true,
      enum: ['general', 'food'],
    },
    closing: { type: String },
    opening: { type: String },
    images: { type: Array },
    // products: {type: Array},
    // products: [product],
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'rejected', 'approved'],
    },
    country: { type: String, toLowerCase: true, required: true },
    city: { type: String, toLowerCase: true, required: true },
    contactNumber: { type: Number, required: true },
    ownerID: { type: String, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// reviews virtuals to get reviews from reviews collection
store.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'storeID',
});

// products virtuals to get products from products collection
store.virtual('products', {
  ref: 'product',
  localField: '_id',
  foreignField: 'storeID',
});

// orders virtuals to get orders from orders collection
store.virtual('orders', {
  ref: 'order',
  localField: '_id',
  foreignField: 'storeID',
});

module.exports = mongoose.model('store', store);
