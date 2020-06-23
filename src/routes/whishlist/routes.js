'use strict';

const express = require('express');
const router = express.Router();
const { getUserWishlist, addProductsToWishlist,  updateWishlist, deleteFromWishlist} = require('./wishlist');

router.get('/wishlist/',getUserWishlist);
router.post('/wishlist',addProductsToWishlist);
router.put('/wishlist/:id',updateWishlist);
router.delete('/wishlist/:id',deleteFromWishlist);

module.exports = router;