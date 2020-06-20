'use strict';
const { Schema } = require('mongoose');

const Review = new Schema({
  userID: { type: String, required: true },
  review: { type: String, required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
  storeID: { type: String },
  productID: { type: String },
});

module.exports = Review;
