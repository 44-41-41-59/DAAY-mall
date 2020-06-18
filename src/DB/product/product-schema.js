'use strict';
const { Schema, model } = require('mongoose');
const reviews = require('../subdocuments/reviews.js');

const Product = Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: Array },
  amount: { type: Number },
  reviews: [reviews],
  description: { type: String },
  category: { type: String },
});

module.exports = model('product', Product);