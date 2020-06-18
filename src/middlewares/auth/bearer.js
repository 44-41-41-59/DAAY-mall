'use strict';
const user = require('../../DB/users/user-schema.js');
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log('/////////////////////');
      next({ status: 401, message: 'Invalid Login no auth headers' });
    } else {
      const [auth, token] = req.headers.authorization.split(' ');
      if (auth === 'Bearer') {
        console.log('recoooooooooord');
        let record = await user.authenticateToken(token);
        console.log(record);
        req.user = {
          username: record.username,
          acl: record.acl,
          capabilities: record.acl.acl,
        };
        req.token = token;
        next();      
      } else {
        next({ status: 401, message: 'Invalid auth header' });
      }
    }
    next();
  } catch (e) {
    next({ status: 500, message: e.message });
  }
};



// 'use strict';
// const user = require('../../DB/users/user-schema.js');
// module.exports = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       console.log('/////////////////////');
//       next({ status: 401, message: 'Invalid Login no auth headers' });
//     } else {
//       const [auth, token] = req.headers.authorization.split(' ');
//       if (auth === 'Bearer') {
//         console.log('recoooooooooord');
        
//         let record = await user.authenticateToken(token);
//         console.log(record);
        
//         req.user = record;
//       } else {
//         next({ status: 401, message: 'Invalid auth header' });
//       }
//     }
//     next();
//   } catch (e) {
//     next({ status: 500, message: e.message });
//   }
// };
