'use strict';
const base64 = require('base-64');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [username, password] = base64.decode(basic).split(':');
    req.body = { username, password };
    next();
  }
};
