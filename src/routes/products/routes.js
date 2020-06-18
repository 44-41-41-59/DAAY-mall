'use strict';

const express = require('express');
const productsModel = require('../../DB/product/product-model');
// const acl= require('../../middlewares/auth/authorize');
// const bearer = require('../../middlewares/auth/bearer');
const router = express.Router();

router.post('/products',addProducts);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts );

function addProducts(req,res){
  productsModel.create(req.body).then((data) => {
    res.json(data);
  })
    .catch((err) => res.status(403).send(err.message));
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




module.exports = router;