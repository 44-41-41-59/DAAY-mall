'use strict';
const express = require('express');
const router = express.Router();
const BasicAuth = require('../../../middlewares/auth/basic.js');
const { signup, signin } = require('../apis/apis.js');

router.route('/').post(signup).get(BasicAuth, signin);

module.exports = router;
