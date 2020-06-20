'use strict';
const express = require('express');
const router = express.Router();

const { addOrder, editOrder, getAllOrders, getOneOrder, deleteOrder } = require('./orders.js');

// create a new order when the user checkout and make a payment, this will post an order to the store and payment history for the user.
// update the order in both the order list and payment history (user or owner update it)
// the orders can't be deleted but rather cancelled

router.route('/order').post(addOrder).get(getAllOrders);
router.route('/order/:id').put(editOrder).patch(editOrder).get(getOneOrder).delete(deleteOrder);

module.exports = router;

