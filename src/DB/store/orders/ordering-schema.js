'use strict';
const { Schema, model } = require('mongoose');

const ordering = Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  userID: { type: Schema.Types.ObjectId, ref: 'user' },
  status: {
    type: String,
    default: 'waiting',
    enum: ['waiting', 'delivered'],
    required: true,
  },
  storeID: { type: Schema.Types.ObjectId },
});

module.exports = model('order', ordering);
