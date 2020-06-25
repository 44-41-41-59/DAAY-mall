'use strict';
const { Schema, model } = require('mongoose');
// const reviews = require('../subdocuments/reviews.js');
// console.log(reviews);
const Product = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: Array },
  amount: { type: Number },
  description: { type: String },
  category: { type: String },
  storeID: { type: String, required: true },
},
{ timestamps: { createdAt: 'created_at' }});

Product.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'productID',
});

module.exports = model('product', Product);
