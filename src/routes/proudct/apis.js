'use strict';
const product = require('../../DB/product/product-model.js');

async function getProducts(req, res, next) {
  let prducts = await product.read();
  let resulte = {
    count: prducts.length,
    resultes: prducts,
  };
  res.json(resulte);
}

async function getProductsById(req, res, next) {
  let prducts = await product.read(req.params.id);
  let resulte = {
    count: prducts.length,
    resultes: prducts,
  };
  res.json(resulte);
}

module.exports = { getProducts, getProductsById };
