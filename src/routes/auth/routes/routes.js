'use strict';
const express = require('express');
const router = express.Router();
const BasicAuth = require('../../../middlewares/auth/basic.js');
const { signup, signin, facebookLogin } = require('../apis/apis.js');


router.route('/').post(signup).get(BasicAuth, signin);
router.route('/facebook').post(facebookLogin);

module.exports = router;
