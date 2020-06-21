'use strict';

const whishlistModel =require('../../DB/whishlist/whishlist-model');

const express = require('express');
const router = express.Router();

router.get('/wishlist/:id',getWhislist);
router.post('/wishlist',addProductsToWhislist);
router.put('/wishlist/:id',updateWhislist);
router.delete('/wishlist/:id',deleteFromWhishlist);


async function getWhislist (req,res,next){
  try{
    let userID= req.params.id;
    let data = await whishlistModel.read(userID);
    res.json(data);
  }
  catch(e) {
    next(e.message);
  }
}

async function addProductsToWhislist (req,res,next){
  try{
    let data = await whishlistModel.create(req.body);
    res.json(data);
  }
  catch(e) {
    next(e.message);
  }
}

async function updateWhislist(req,res,next){
  try {
    let id = req.params.id;
    const data = await whishlistModel.update(id,req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

async function deleteFromWhishlist(req,res,next){
  try {
    let id = req.params.id;
    await whishlistModel.delete(id);
    res.json('Item is Deleted');
  } catch (e) {
    next(e.message);
  }
}

module.exports = router;