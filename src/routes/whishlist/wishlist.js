'use strict';
const {wishlist} = require('../../DB/collection-models');


async function getUserWishlist (req,res,next){
  try{
    let userID = req.user.id;
    let data = await wishlist.read({userID});
    res.json(data);
  }
  catch(e) {
    next(e.message);
  }
}

async function addProductsToWishlist (req,res,next){
  try{
    let data = await wishlist.create(req.body);
    res.json(data);
  }
  catch(e) {
    next(e.message);
  }
}

async function updateWishlist(req,res,next){
  try {
    let id = req.params.id;
    const data = await wishlist.update(id,req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

async function deleteFromWishlist(req,res,next){
  try {
    let id = req.params.id;
    await wishlist.delete(id);
    res.json('Item is Deleted');
  } catch (e) {
    next(e.message);
  }
}

module.exports = {
  getUserWishlist,
  addProductsToWishlist,
  updateWishlist,
  deleteFromWishlist,
};