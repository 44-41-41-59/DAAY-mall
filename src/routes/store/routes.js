'use strict';
const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer.js');
const permissions = require('../../middlewares/auth/authorize.js');
const { addStore, editStore, deleteStore, getAllStores, getOneStore, getOwnerAllStores } = require('./store.js');

// create new store by USER/ get all stores by USER
router.route('/store').post(addStore).get(getAllStores);
// get all the stores owned by one owner by USER
router.route('/store/:owner_id').get(getOwnerAllStores);
// get one store by store ID by USER/  edit one store by OWNER / edit one store status by ADMIN / delete one store by OWNER and ADMIN 
router.route('/store/:store_id').get(getOneStore).put(bearer, permissions('update'), editStore).patch(bearer, permissions('updateStoreStatus'), editStore).delete(bearer, permissions('delete'), deleteStore);

module.exports = router;