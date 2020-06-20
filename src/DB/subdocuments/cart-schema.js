'use strict';
const { Schema, model } = require('mongoose');
const products = require('../product/product-schema.js');

const Cart = Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

module.exports = model('cart', Cart);
