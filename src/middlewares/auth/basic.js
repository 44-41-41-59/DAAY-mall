'use strict';
const base64 = require('base-64');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next({ status: 401, message: 'No Header' });
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [email, password] = base64.decode(basic).split(':');
    req.body = { email, password };
    next();
  }
};
