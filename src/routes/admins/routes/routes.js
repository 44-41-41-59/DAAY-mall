'use strict';
const express = require('express');
const router = express.Router();
const Roles = require('../../../DB/subdocuments/roles.js');

router.route('/post/roles').post(async (req, res, next) => {
  try {
    let roles = {
      user: ['createReview', 'createCart'],
      owner: ['read', 'create', 'delete', 'updata'],
      admin: ['read', 'create', 'update', 'delete'],
    };
    for (let key in roles) {
      let record = new Roles({ role: key, permissions: roles[key] });
      record = await record.save();
    }
    res.send('all roles did add successfully');
  } catch (e) {
    next({ status: 500, message: e.message });
  }
});

module.exports = router;
