'use strict';
const express = require('express');
const router = express.Router();
// const Bearer = require('../../middlewares/auth/bearer.js')
const { getProducts } = require('./apis.js');
// const product = require('../../DB/product/product-model.js');

router.route('/read').get(getProducts);
// router.route('/facebook').post(facebookLogin);

module.exports = router;
