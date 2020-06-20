'use strict';

const express = require('express');
const router = express.Router();
const {getReviews, getOneReview, addReview, editReview, deleteReview} = require('./reviews.js');

//get all reviews for one product or store or if you dont put query you will get all the reviews for everything/ add one review to a product (you should pass the productID as a query)
router.route('/review').get(getReviews).post(addReview);
// get one review on a specific product or store / edit one review on a product or store/ delete one review on a product or a store
router.route('/review/:id').get(getOneReview).put(editReview).delete(deleteReview);



module.exports = router;
