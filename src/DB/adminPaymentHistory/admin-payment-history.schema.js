'use strict';
const { Schema, model } = require('mongoose');

const adminPaymentHistory = Schema({
  userID: { type: Schema.Types.ObjectId },
  orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
  paymentsHistory: { type: Schema.Types.ObjectId, ref: 'paymentsHistory' },
  invalid: [{ type: Schema.Types.ObjectId, ref: 'order', default:[]}],
},
{ timestamps: { createdAt: 'created_at' }});

module.exports = model('adminPaymentHistory', adminPaymentHistory);
