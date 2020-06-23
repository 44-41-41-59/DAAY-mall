'use strict';
const { Schema, model } = require('mongoose');

const OrdersPayments = Schema({
  userID: { type: Schema.Types.ObjectId },
  orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
  paymentsHistory: { type: Schema.Types.ObjectId, ref: 'paymentsHistory' },
  invalid: { type: Schema.Types.ObjectId, ref: 'order' },
});

module.exports = model('orderpayment', OrdersPayments);
