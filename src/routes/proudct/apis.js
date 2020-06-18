'use strict';
const product = require('../../DB/product/product-model.js');

async function getProducts(req, res, next) {
  //   await product.creat();
  let prducts = await product.read();
  let resulte = {
    count: prducts.length,
    resultes: prducts,
  };
  res.json(resulte);
}

module.exports = { getProducts };
