'use strict';
const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer.js');
const { addStore, editStore, deleteStore, getAllStores, getOneStore } = require('./store.js');

router.route('/store').post(addStore).get(getAllStores);
router.route('/store/:id').get(getOneStore).put(editStore).delete(deleteStore);

module.exports = router;