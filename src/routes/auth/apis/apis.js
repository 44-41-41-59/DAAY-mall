'use strict';
const userCollection = require('../../../DB/users/user-model.js');
const fetch = require('node-fetch');
const user = require('../../../DB/users/user-schema.js');

// sign up function
async function signup(req, res, next) {
  let record;
  try {
    let check = await userCollection.read(req.body);
    console.log(check, 'check');
    if (check.status === 401) {
      record = await userCollection.create(req.body);
      console.log(record, 'record');
      req.acl = {
        acl: record.acl.capabilities,
      };

      res.json({ data: record, acl: req.acl });

    } else {
      throw Error('user already signed up');
    }
  } catch (e) {
    console.log({ status: 500, message: e.message });
    next({ status: 500, message: e.message });
  }
}

// sign in function
async function signin(req, res, next) {
  let record = await userCollection.read(req.body);
  if (typeof record !== 'string') {
    req.acl = {
      acl: record.acl.capabilities,
    };
    res.cookie('token', record.token);

    res.json({ data: record, acl: req.acl });

  } else {
    next(record);
  }
}

// facebook login function 
async function facebookLogin(req, res) {
  const { accessToken, userID } = req.body;
  const response = await fetch(
    `https://graph.facebook.com/v7.0/10216983614326453/?access_token=${accessToken}&fields=id%2Cname%2Cemail%2Cpicture&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();
  if (json.id === userID) {
    //valid user
    // check if the user exists in db else register and then login
    const resp = await user.findOne({ facebookID: userID });
    if (resp) {
      //user is registered then create a session
      res.json({ status: 'ok', data: 'you are logged in' });
    } else {
      const person = {
        username: json.name,
        password: '' + Math.round(1000),
        email: json.email,
        avatar: json.picture.data.url,
        facebookID: userID,
        userSignInType: 'facebook',
      };
      userCollection.create(person);
      res.json({ status: 'ok', data: 'you are registered and logged in' });
    }
  } else {
    // invalid user warning
    res.json({ status: 'error', data: 'stop' });
  }
}

function googleLogin (req, res){
  res.json({ token: req.token, user: req.user });
}


module.exports = {
  signin,
  signup,
  facebookLogin,
  googleLogin,
};
