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
async function updateProducts(req,res,next){
  try {
    let id = req.params.id;
    // console.log(id, req.body);
    const data = await productsModel.update(id,req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

async function deleteProducts(req,res,next){
  try {
    let id = req.params.id;
    await productsModel.delete(id);
    res.json('Product is Deleted');
  } catch (e) {
    next(e.message);
  }
}

module.exports = {
  addProductsHandler,
  getProducts,
  updateProducts,
  deleteProducts,
};