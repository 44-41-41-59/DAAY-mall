'use strict';
const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken'); 

const user = ['read','comment','rate'];
const admin = ['read'];
const owner = ['read'];
const SECRET = process.env.SECRET || 'Ahmed1997';
const Role = Schema({
  role: { type: String, required: true, enum: ['user', 'admin', 'owner'] },
  capabilities: { type: Array, required: true },
});

Role.virtual('review', {
  ref: 'review',
  localField: '_id',
  foreignField: 'storeID',
});

Role.virtual('user', {
  ref: 'user',
  localField: 'user_id',
  foreignField: 'userID',
});

Role.virtual('store', {
  ref: 'store',
  localField: 'store_id',
  foreignField: 'storeID',
});

Role.virtual('product', {
  ref: 'product',
  localField: 'product_id',
  foreignField: 'productID',
});


Role.methods.tokenGenerator = function () {
  let capabilities;
  if (this.role === 'user'){
    capabilities = user;
  }else if (this.role === 'admin')
  {
    capabilities = admin;
  }else if( this.role === 'owner'){
    capabilities= owner;
    let token = 
  jwt.sign({  role: this.role, id:this._id ,capabilities: capabilities ,expiresIn:  900000}, SECRET);  return token;
  }
};
module.exports = model('role', Role);
