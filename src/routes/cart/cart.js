'use strict';

const {cart} = require('../../DB/collection-models');

function getCart(req, res, next) {
  cart.read(req.qurey).then((data) => res.json(data));
  // let key, cartType;
  // if (req.query.productID) {
  //   key = 'productID';
  //   cartType = req.query.productID;
  // }
  // cart
  //   .read({ [key]: cartType })
  //   .then((data) => res.json({ count: data.length, results: data }))
  //   .catch(next);
}

function getOneCart(req, res, next) {
  cart
    .read({ _id: req.params.id })
    .then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

function addCart(req, res, next) {
  // if ( req.query.productID){
  //   req.body.productID = req.query.productID;
  // }
  cart
    .create(req.body)
    .then((results) => {
      res.json(results);
    })
    .catch(next);
}

function deleteCart(req, res, next) {
  let userID = req.params.id;
  console.log(userID);
  cart
    .delete({ userID })
    .then((record) => {
      res.json(record);
    })
    .catch(next);
}

module.exports = {
  getCart,
  getOneCart,
  addCart,
  deleteCart,
};
