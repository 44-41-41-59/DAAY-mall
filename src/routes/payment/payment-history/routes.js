'use strict';

const express = require('express');
const {
  getPaymentHistory,
  addPaymentHistory,
  deletePaymentHistory,
  getOnePaymentHistory,
} = require('./payment-history.js');

const router = express.Router();
// get all of the payment history for one user
router.route('/payment/history/all/:user_id').get(getPaymentHistory);
// add one item to the payment history
router.route('/payment/history').post(addPaymentHistory);
// get or delete one item form the payment history
router
  .route('/payment/history/:id')
  .get(getOnePaymentHistory)
  .delete(deletePaymentHistory);

module.exports = router;
