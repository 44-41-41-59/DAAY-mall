'use strict';
const { Schema, model } = require('mongoose');
const products = require('../product/product-schema.js');

const WishList = Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

module.exports = model('wishlist', WishList);
