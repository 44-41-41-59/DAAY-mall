'use strict';

const express = require('express');
const permissions= require('../../middlewares/auth/authorize');
const bearer = require('../../middlewares/auth/bearer');
const {addProductsHandler, getProducts, updateProducts, deleteProducts} = require('./products.js');
const router = express.Router();

router.route('/products').post(bearer, permissions('create'), addProductsHandler);
router.route('/products').get(getProducts);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts );


module.exports = router;