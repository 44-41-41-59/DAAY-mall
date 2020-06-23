'use strict';
const { Schema, model } = require('mongoose');

const ViwedProduct = Schema({
  userID: { type: Schema.Types.ObjectId },
  products: { type: Schema.Types.ObjectId, ref: 'product' },
});

module.exports = model('viewedProduct', ViwedProduct);
