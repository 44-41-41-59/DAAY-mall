// 'use strict';
// // const user = require('../../DB/schemas/user.schema.js');
// module.exports = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       next('Invalid Login no auth headers');
//     } else {
//       const [auth, token] = req.headers.authorization.split(' ');
//       if (auth === 'Bearer') {
//         let record = await user.authenticateToken(token);
//         req.user = record;
//       } else {
//         next('Invalid auth header');
//       }
//     }
//     next();
//   } catch (e) {
//     next(e.message);
//   }
// };
