'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);

router.route('/charge').post(pay);

function pay(req, res, next) {
  const amount = 1000;
  console.log(req.body);
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) => {
      console.log('cost', customer);
      stripe.charges.create({
        amount,
        description: 'DAAY-mall check',
        currency: 'usd',
        customer: customer.id,
      });
    })
    .then((charge) => res.send('done'));
}

module.exports = router;
