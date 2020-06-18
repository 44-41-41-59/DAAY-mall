'use strict';

const express = require('express');
const productsModel = require('../../DB/product/product-model');
const router = express.Router();

router.post('/addProducts', addProductsHandler);

function addProductsHandler(req,res){
  productsModel.create(req.body).then((data) => {
    res.json(data);
  })
    .catch((err) => res.status(403).send(err.message));
}

module.exports = router;