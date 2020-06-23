'use strict';
const express = require('express');
const router = express.Router();
const Roles = require('../../../DB/schemas/roles');

router.route('/post/roles').post(async (req, res, next) => {
  try {
    let roles = {
      user: ['createReview', 'createCart'],
      owner: ['read', 'create', 'delete', 'updata'],
      admin: ['read', 'create', 'update', 'delete', 'updateStoreStatus', 'readPendingStores'],
    };
    for (let key in roles) {
      let record = new Roles({ role: key, capabilities: roles[key] });
      record = await record.save();
    }
    res.send('All roles has been added successfully');
  } catch (e) {
    next({ status: 500, message: e.message });
  }
});

module.exports = router;
