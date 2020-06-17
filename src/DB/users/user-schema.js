'use strict';
const { Schema, model } = require('mongoose');
const review = require('../subdocuments/reviews.js');

const user = Schema({
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
  userSignInType:{
    type: String,
    default: 'auth',
    enum: ['auth', 'facebook', 'google'],
    toLowerCase: true,
  },
  facebookID: { type: String, required: false },
},{toObject:{virtuals:true}},{toJSON:{virtuals:true}});

user.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'userID',
});

module.exports = model('users', user);



