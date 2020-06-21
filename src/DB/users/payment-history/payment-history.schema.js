'use strict';
const { Schema, model } = require('mongoose');
// const products = require('../product/product-schema.js');

const paymentsHistory = Schema({
  userID: { type: Schema.Types.ObjectId },
  productID: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  cost: { type: Number },
});

// when the user buy a product, it will create an instance for the payment history with the product ID and using virtuals it will get the whole product from the product collection.
// then we will populate every store ordering collection with the orders.
// since every product has unique ID so we don't have to add the store ID.
// paymentsHistory.virtual('userOrder', {
//   ref: 'product',
//   localField: 'productID',
//   foreignField: '_id',
// });

module.exports = model('paymentsHistory', paymentsHistory);
