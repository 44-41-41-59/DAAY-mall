'use strict';
const { Schema, model } = require('mongoose');
const products = require('../product/product-schema.js');

const ViwedProduct = Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

module.exports = model('viwedProduct', ViwedProduct);
