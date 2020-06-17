/* eslint-disable comma-dangle */
'use strict';
const { Schema, Model } = require('mongoose');
const reviews = require('../subdocuments/reviews.js');
const product = require('../product/product-schema.js');

const Store = new Schema(
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
    products: [product],
  },
  { toJSON: true, toObject: true }
);

Store.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'storeID',
});

module.exports = new Model('store', Store);
