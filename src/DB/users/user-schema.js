/* eslint-disable comma-dangle */
'use strict';
require('dotenv').config();
const { Schema, model } = require('mongoose');
const review = require('../subdocuments/reviews.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'daaymall';
let avatar =
  'https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg';

const user = Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true, default: avatar },
    creditNumber: { type: String, maxlength: 19, minlength: 10 },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'owner'],
      toLowerCase: true,
    },
    userSignInType: {
      type: String,
      default: 'auth',
      enum: ['auth', 'facebook', 'google'],
      toLowerCase: true,
    },
    facebookID: { type: String },
    token: { type: String },
  },
  { toObject: { virtuals: true } },
  { toJSON: { virtuals: true } }
);

user.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'userID',
});

user.pre('save', async function (next) {
  try {
    let hashedPassword = await bcrypt.hash(this.password, 6);
    this.password = hashedPassword;
    this.token = jwt.sign({ id: this._id }, SECRET, { expiresIn: '10d' });
    // await this.populate('acl').execPopulate();
    next();
  } catch (e) {
    console.log(e.message);
  }
});

user.statics.authenticateUser = async function (pass, hash) {
  let validPass;
  try {
    validPass = await bcrypt.compare(pass, hash);
  } catch (e) {
    console.log(e.message);
  }
  return validPass;
};

user.statics.generateToken = function (id) {
  const userToken = jwt.sign({ id: id }, SECRET, { expiresIn: '10d' });
  return userToken;
};

user.statics.authenticateToken = async function (token) {
  try {
    const tokenObject = await jwt.verify(token, SECRET);
    let user = await this.find({ _id: tokenObject.id });
    if (user[0].token !== token)
      return Promise.reject({ message: 'NOt the same token' });
    let newToken = this.generateToken(user[0]._id);
    let newUser = await this.findOneAndUpdate(
      { _id: user[0]._id },
      { token: newToken },
      { new: true }
    );
    if (user[0]) {
      return Promise.resolve(newUser);
    } else {
      return Promise.reject({ message: 'User is not found!' });
    }
  } catch (e) {
    return Promise.reject({ message: e.message });
  }
};

module.exports = model('user', user);
