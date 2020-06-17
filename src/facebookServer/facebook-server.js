'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const user = require('../DB/users/user-schema.js');
const fetch = require('node-fetch');


app.use(cors());
app.use('/', express.static('./public'));
app.use(bodyParser.json());
app.post('/login-with-facebook', async (req, res)=> {
  console.log('hello');
  const {accessToken, userID} = req.body;    
  const response = await fetch(`https://graph.facebook.com/v7.0/10216983614326453/?access_token=${accessToken}&fields=id%2Cname%2Cemail%2Cpicture&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();
  if(json.id === userID){
    //valid user
    // check if the user exists in db else register and then login
    const resp = await user.findOne({facebookID:userID});
    if(resp){
      //user is registered then create a session
      res.json({status: 'ok', data: 'you are logged in'});
    } else {
      const person = new user({
        username: json.name,
        password: 'N/A',
        email: json.email,
        avatar: json.picture.data.url,
        facebookID: userID,
        accessToken,
      });

      await person.save();
      res.json({status: 'ok', data: 'you are registered and logged in'});
    }
  }else {
    // invalid user warning
    res.json({status: 'error', data: 'stop'});
  }
});

module.exports = app;