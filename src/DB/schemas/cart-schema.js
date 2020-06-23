'use strict';
const { Schema, model } = require('mongoose');

const Cart = Schema({
  userID: { type: Schema.Types.ObjectId },
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  quantity:{type: Number},
});

// Cart.virtual('carts', {
//   ref: 'carts',
//   localField: '_id',
//   foreignField: 'productID',
// });

module.exports = model('cart', Cart);
