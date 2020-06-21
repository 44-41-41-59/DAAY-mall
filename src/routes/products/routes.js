'use strict';

const express = require('express');
const permissions= require('../../middlewares/auth/authorize');
const bearer = require('../../middlewares/auth/bearer');
const {addProductsHandler, getProducts, updateProducts, deleteProducts, getStoreProducts, getProductsById} = require('./products.js');

const router = express.Router();
// get all products from all stores by USER
router.route('/products').get(getProducts);
// get one product from all stores by USER/OWNER
router.route('/products/:id').get(bearer('none'),getProductsById);
// add products for each store by OWNER
router.route('/products').post(bearer('registered'), permissions('create'), addProductsHandler);
// update each product by id by OWNER
router.route('/products/:id').put(bearer('registered'), permissions('update'), updateProducts);
// delete each product by id by OWNER
router.route('/products/:id').delete(bearer('registered'), permissions('delete'), deleteProducts);
// get all products of a specific store
router.route('/products/:store_id').get(getStoreProducts);

module.exports = router;