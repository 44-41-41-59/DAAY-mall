'use strict';
const express = require('express');
const router = express.Router();
const BasicAuth = require('../../../middlewares/auth/basic.js');
const { signup, signin, facebookLogin } = require('../apis/apis.js');
const usersModel = require('../../../DB/users/user-model');

// sign up and sign in for users
router.route('/').post(signup).get(BasicAuth, signin);
// facebook login and save user data to database
router.route('/facebook').post(facebookLogin);


// for testing the users
router.route('/users').get((req,res,next)=>{  
  usersModel.read().then((data)=>{
    data.forEach(user=>{
      console.log( user);
    });
    res.json({count:data.length,users:data});
  });
});

module.exports = router;
