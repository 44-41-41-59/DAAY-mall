'use strict';
const user = require('../../DB/users/user-schema.js');
const { compare } = require('bcryptjs');

module.exports=(type)=>{
  return async (req, res, next) => {
    if(req.params.model === 'cart') type = 'registered';
    if (req.params.model === 'wishlist') type = 'registered';
    if (req.params.model === 'favorite') type = 'registered';
    if (req.params.model === 'payment') type = 'registered';
    if (req.params.model === 'review') type = 'registered';
    if (req.params.model === 'order') type = 'registered';
    
    if(type==='none'){
      if(req.headers.authorization){
        const [auth, token] = req.headers.authorization.split(' ');
        if (auth === 'Bearer') {
          let record = await user.authenticateToken(token);
          req.user = {
            username: record.username,
            acl: record.acl,
            capabilities: record.acl.capabilities,
            id:record.id,
          };
          next();
        }
        else{
          next();
        }
      }
      else{
        next();
      }
    }
    else if(type==='registered'){
      try {
        if (!req.headers.authorization) {
          next({ status: 401, message: 'Invalid Login no auth headers' });
        } else {
          const [auth, token] = req.headers.authorization.split(' ');
          if (auth === 'Bearer') {
            let record = await user.authenticateToken(token);
            req.user = {
              username: record.username,
              acl: record.acl,
              capabilities: record.acl.capabilities,
              id:record.id,
            };
          } else {
            next({ status: 401, message: 'Invalid auth header' });
          }
        }
        next();
      } catch (e) {
        next({ status: 500, message: e.message });
      }
    }
  };
};