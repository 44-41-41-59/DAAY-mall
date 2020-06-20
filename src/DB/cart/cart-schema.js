'use strict';
const { Schema, model } = require('mongoose');
const products = require('../product/product-schema.js');

const Cart = Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

Cart.virtual('carts', {
  ref: 'carts',
  localField: '_id',
  foreignField: 'productID',
});

module.exports = model('cart', Cart);
