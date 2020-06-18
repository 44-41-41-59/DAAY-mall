'use strict';

const productsModel = require('../../DB/product/product-model');

function addProductsHandler(req,res){
  productsModel.create(req.body).then((data) => {
    res.json(data);
  })
    .catch((err) => res.status(403).send(err.message));
}
async function getProducts(req, res, next) {
  //   await product.creat();
  let prducts = await productsModel.read();
  let resulte = {
    count: prducts.length,
    resultes: prducts,
  };
  res.json(resulte);
}

module.exports = {
  addProductsHandler,
  getProducts,
};