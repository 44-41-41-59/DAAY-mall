/* eslint-disable comma-dangle */
'use strict';
const mongoose = require('mongoose');
const reviews = require('../subdocuments/reviews.js');
// const product = require('../product/product-schema.js');

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
    products: {type: Array},
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
  { toJSON: {virtuals:true}, toObject: {virtuals:true} }
);

store.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'storeID',
});

module.exports = mongoose.model('store', store);
