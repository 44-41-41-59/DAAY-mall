/* eslint-disable comma-dangle */
'use strict';
require('dotenv').config();
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'daaymall';

// default image for users
let avatar =
  'https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg';

// users schema
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
    paymentsHistory: [{ type: Schema.Types.ObjectId, ref: 'paymintsHistory' }],
  },
  { toObject: { virtuals: true } },
  { toJSON: { virtuals: true } }
);

// reviews virtuals
user.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'userID',
});

// roles virtuals
user.virtual('acl', {
  ref: 'role',
  localField: 'role',
  foreignField: 'role',
  justOne: true,
});

user.virtual('wishlist', {
  ref: 'wishlist',
  localField: '_id',
  foreignField: 'userID',
});

user.virtual('viewedProducts', {
  ref: 'viewedProduct',
  localField: '_id',
  foreignField: 'userID',
});

user.virtual('carts', {
  ref: 'cart',
  localField: '_id',
  foreignField: 'userID',
});

user.virtual('favoriteStores', {
  ref: 'favoriteStore',
  localField: '_id',
  foreignField: 'userID',
});

// pre save hook for hashing the password before saving in database
user.pre('save', async function (next) {
  try {
    let hashedPassword = await bcrypt.hash(this.password, 6);
    this.password = hashedPassword;
    this.token = jwt.sign({ id: this._id }, SECRET, { expiresIn: '10d' });
    next();
  } catch (e) {
    console.log(e.message);
  }
});

// post save hook for populating with capabilities
user.post('save', async function (next) {
  console.log('post save');
  await this.populate('acl').execPopulate();
  // next();
});

// static method for user schema to authenticate the users
user.statics.authenticateUser = async function (pass, hash) {
  let validPass;
  try {
    validPass = await bcrypt.compare(pass, hash);
  } catch (e) {
    console.log(e.message);
  }
  return validPass;
};

// static method for user schema to generate token
user.statics.generateToken = function (id) {
  const userToken = jwt.sign({ id: id }, SECRET, { expiresIn: '10d' });
  return userToken;
};

// static method for user schema to authenticate token
user.statics.authenticateToken = async function (token) {
  try {
    const tokenObject = await jwt.verify(token, SECRET);
    let user = await this.find({ _id: tokenObject.id });
    if (user[0].token !== token)
      return Promise.reject({ message: 'Create another token!!' });
    let newToken = this.generateToken(user[0]._id);
    let newUser = await this.findOneAndUpdate(
      { _id: user[0]._id },
      { token: newToken },
      { new: true }
    )
      .populate('acl')
      .exec();

    if (user[0]) {
      return Promise.resolve(newUser);
    } else {
      return Promise.reject({ message: 'User not found!' });
    }
  } catch (e) {
    return Promise.reject({ message: e.message });
  }
};
user.statics.can = (permission, userRole) => {
  return userRole.includes(permission);
};

module.exports = model('user', user);
