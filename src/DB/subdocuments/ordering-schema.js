'use strict';
const { Schema, model } = require('mongoose');
const products = require('../product/product-schema.js');

const Ordering = Schema({
  orders: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  userID: { type: Schema.Types.ObjectId },
  storeID: { type: Schema.Types.ObjectId },
});

module.exports = model('order', Ordering);
