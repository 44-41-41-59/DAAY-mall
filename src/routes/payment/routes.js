'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);

router.route('/charge').post(pay);

async function pay(req, res, next) {
  const amount = 1000;
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
