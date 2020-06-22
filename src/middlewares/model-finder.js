'use strict';

const cartModel = require('../DB/cart/cart.model');
const wishListModel = require('../DB/whishlist/whishlist-model');
const payementHistoryModel = require('../DB/users/payment-history/payment-history.model');
const reviewModel = require('../DB/review/review.model');
const orderModel = require('../DB/store/orders/orders.model');
const storeModel = require('../DB/store/store.model');
const favoriteModel = require('../DB/favorite/favorite.model');
const productsModel = require('../DB/product/product-model');

module.exports = (req, res, next) => {
  const model = req.params.model;
  switch (model) {
  case 'cart':
    req.model = cartModel;
    next();
    return;
  case 'wishlist':
    req.model = wishListModel;
    next();
    return;
  case 'payment':
    req.model = payementHistoryModel;
    next();
    return;
  case 'review':
    req.model = reviewModel;
    next();
    return;
  case 'order':
    req.model = orderModel;
    next();
    return;
  case 'store':
    req.model = storeModel;
    next();
    return;
  case 'favorite':
    req.model = favoriteModel;
    next();
    return;
  case 'products':
    req.model = productsModel;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
};