'use strict';
const { Schema, Model } = require('mongoose');
const review = require('../subdocuments/reviews.js');

const User = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  creditNumber: { type: String, maxlength: 19, minlength: 10 },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'owner'],
    toLowerCase: true,
  },
});

User.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'userID',
});

module.exports = new Model('user', User);
