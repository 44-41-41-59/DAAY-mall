'use strict';
const { Schema, model } = require('mongoose');
const products = require('../product/product-schema.js');

const PaymintsHistory = Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  cost: { type: Number },
});

module.exports = model('paymintsHistory', PaymintsHistory);
