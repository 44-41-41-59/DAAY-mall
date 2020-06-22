'use strict';
require('dotenv').config();
const superagent = require('superagent');
const {users} = require('../../DB/users/user-model');
const tokenServerUrl = 'https://oauth2.googleapis.com/token';
const remoteAPI = 'https://www.googleapis.com/oauth2/v2/userinfo';

const CLIENT_ID = process.env.CLIENT_ID;

const CLIENT_SECRET = process.env.CLIENT_SECRET;

const API_SERVER = process.env.API_SERVER;

module.exports = async (req, res, next) => {
  try {
    const code = req.query.code;
    // console.log('__THE CODE__', code);
    const remoteToken = await exchangeCodeForToken(code);
    // console.log('The TOKEN', remoteToken);
    const remoteUser = await getRemoteUserInfo(remoteToken);
    const [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err.message);
  }
};
async function exchangeCodeForToken(code) {
  const tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });

  //   console.log('tokenResponse.body',tokenResponse.body);
  const access_token = tokenResponse.body.access_token;
  return access_token;
}
async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `Bearer ${token}`);

  let user = userResponse.body;
  return user;
}
async function getUser(remoteUser) {
  const userRecord = {
    username: remoteUser.name,
    password: '0000',
    email:remoteUser.email,
  };
  const user = await users.save(userRecord);
  let token = users.generateToken(user);
  return [user, token];
} 