'use strict';
const user = require('../../DB/users/user-schema.js');
module.exports=(type)=>{
  return async (req, res, next) => {
    if(type==='none'){
      if(req.headers.authorization){
        const [auth, token] = req.headers.authorization.split(' ');
        if (auth === 'Bearer') {
          let record = await user.authenticateToken(token);
          // console.log('record in bearer', record.populate('acl').exec(), 'request', req.body);
          req.user = {
            username: record.username,
            acl: record.acl,
            capabilities: record.acl.capabilities,
            id:record.id,
          };
          console.log(req.user,'******************');
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
            // console.log('record in bearer', record.populate('acl').exec(), 'request', req.body);
            req.user = {
              username: record.username,
              acl: record.acl,
              capabilities: record.acl.capabilities,
              id:record.id,
            };
            console.log(req.user,'******************');
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