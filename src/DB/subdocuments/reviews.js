'use strict';
const { Schema, model } = require('mongoose');

const Review = new Schema({
  userID: { type: String },
  review: { type: String, required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
  storeID: { type: String, required: true },
});

// module.exports = model('review', Review);
module.exports = Review;
