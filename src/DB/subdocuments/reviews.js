'use strict';
const { Schema, Model } = require('mongoose');

const Review = new Schema({
  userID: { type: String },
  review: { type: String, required: true },
  rate: { type: Number, required: true, min: 0, max: 5 },
  storeID: { type: String, required: true },
});

module.exports = new Model('review', Review);
