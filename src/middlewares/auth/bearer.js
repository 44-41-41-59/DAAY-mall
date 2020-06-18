'use strict';
const user = require('../../DB/users/user-schema.js');
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next({ status: 401, message: 'Invalid Login no auth headers' });
    } else {
      const [auth, token] = req.headers.authorization.split(' ');
      if (auth === 'Bearer') {
        let record = await user.authenticateToken(token);
        req.user = record;
      } else {
        next({ status: 401, message: 'Invalid auth header' });
      }
    }
    next();
  } catch (e) {
    next({ status: 500, message: e.message });
  }
};