'use strict';
const express = require('express');
const router = express.Router();
const bearer = require('../../middlewares/auth/bearer');
const permissions = require('../../middlewares/auth/authorize');
const { addStore, editStore, deleteStore, getAllStores, getOneStore, getOwnerAllStores, getPendingStores} = require('./store.js');

// create new store by USER/ get all stores by USER
router.route('/store').post(addStore).get(getAllStores);
// get all pending stores in the admin dashboard
router.route('/store/admin/dashboard').get(bearer, permissions('readPendingStores'),getPendingStores);
// get all the stores owned by one owner by USER
router.route('/store/:owner_id').get(getOwnerAllStores);
// get one store by store ID by USER/  edit one store by OWNER / edit one store status by ADMIN / delete one store by OWNER and ADMIN 
router.route('/store/:store_id').get(getOneStore).put(bearer, permissions('update'), editStore).patch(bearer, permissions('updateStoreStatus'), editStore).delete(bearer, permissions('delete'), deleteStore);

module.exports = router;