'use strict';

const express = require('express');
const router = express.Router();
const {getFavorite, getOneFavorite, addFavorite, deleteFavorite} = require('./favorites');


router.route('/favorite').get(getFavorite).post(addFavorite);
// router.route('/favorite/:id').get(getOneFavorite).delete(deleteFavorite);

module.exports = router;

