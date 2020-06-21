'use strict';

const express = require('express');
const router = express.Router();
const {getCart, getOneCart, addCart, deleteCart} = require('./cart');


router.route('/cart').get(getCart).post(addCart);
router.route('/cart/:id').get(getOneCart).delete(deleteCart);

module.exports = router;

