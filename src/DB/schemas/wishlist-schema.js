'use strict';
const { Schema, model } = require('mongoose');
const products = require('./product-schema.js');


const WishList = Schema({
  userID:{type:Schema.Types.ObjectId},
  productID:{type:Schema.Types.ObjectId, ref : 'product'},
});


module.exports = model('wishlist', WishList);
