'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);
const cart = require('../../DB/cart/cart.model.js');
const payments = require('../../DB/orderspayment/orderspayments-collection.js');
const order = require('../../DB/users/payment-history/payment-history.model.js');
const pay2 = require('../../DB/store/orders/orders.model.js');
// const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);


router.route('/charge').post(pay);

async function pay(req, res, next) {
  let obj = {};
  let arr = [];
  let amount = 0;
  let historyID;
  let x = await cart.test(req.body.userID);
  x.forEach((element) => {
    arr.push(element.products._id);
    amount += element.products.price;
    if (obj[element.products.storeID])
      obj[element.products.storeID].push(element.products._id);
    else obj[element.products.storeID] = [element.products._id];
  });
  let y = await order.create({
    userID: req.body.userID,
    productID: arr,
    cost: amount,
  });
  let b = [];
  for (let key in obj) {
    let z = await pay2.create({
      storeID: key,
      products: obj[key],
      userID: req.body.userID,
    });
    b.push(z._id);
  }
  await payments.create({
    paymentsHistory: y._id,
    userID: req.body.userID,
    orders: b,
  });
  console.log(obj);
  res.json(x);
  // stripe.customers
  // .create({
  //   email: req.body.stripeEmail,
  //   source: req.body.stripeToken,
  // })
  // .then((customer) => {
  //   stripe.charges.create({
  //     amount,
  //     description: 'DAAY-mall check',
  //     currency: 'usd',
  //     customer: customer.id,
  //   });
  // })
  // .then((charge) => {

  //   res.send('done');
  // })
  // .catch((e) => next({ status: 500, message: e.message }));
}

module.exports = router;
