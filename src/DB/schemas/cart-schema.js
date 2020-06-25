'use strict';
const { Schema, model } = require('mongoose');
const products = require('./product-schema.js');

const Cart = Schema({
  userID: { type: Schema.Types.ObjectId },
  products: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number, default: 1 },
},
{ timestamps: { createdAt: 'created_at' }});

// Cart.virtual('carts', {
//   ref: 'carts',
//   localField: '_id',
//   foreignField: 'productID',
// });

module.exports = model('cart', Cart);
