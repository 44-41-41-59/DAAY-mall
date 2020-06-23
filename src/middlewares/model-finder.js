/* eslint-disable no-fallthrough */
'use strict';


module.exports = (req, res, next) => {
  const model = req.params.model;
  switch (model) {
  case 'cart':

  case 'wishlist':

  case 'payment':

  case 'review':

  case 'order':

  case 'store':

  case 'favorite':

  case 'product':
    req.model = require('../DB/collection-model')[model];
    next();
    return;
  default:
    next('invalid model');
    return;
  }
};