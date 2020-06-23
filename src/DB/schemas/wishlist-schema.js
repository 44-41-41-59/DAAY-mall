'use strict';
const { Schema, model } = require('mongoose');

const WishList = Schema({
  userID:{type:Schema.Types.ObjectId},
  productID:{type:Schema.Types.ObjectId, ref : 'product'},
});


module.exports = model('wishlist', WishList);
