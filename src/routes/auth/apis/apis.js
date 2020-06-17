'use strict';
const userCollection = require('../../../DB/users/user-model.js');
async function signup(req, res, next) {
  let record;
  try {
    record = await userCollection.create(req.body);
    res.send(record);
  } catch (e) {
    console.log(e.message);
    next({ status: 500, message: e.message });
  }
}

async function signin(req, res, next) {
  let record = await userCollection.read(req.body);
  if (typeof record !== 'string') {
    res.cookie('token', record.token);
    res.json(record);
  } else {
    next(record);
  }
}

module.exports = {
  signin,
  signup,
};
