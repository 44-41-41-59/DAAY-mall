'user strict';
const User = require('../../DB/users/user-schema.js');
/**
 * @function permission
 * @param {String} capability the permission the  route need
 */
module.exports = (capability) => (req, res, next) => {
  console.log('**************************************',req);
  let userPermissions = req.user.acl.permissions;
  console.log(userPermissions, 'the user');
  if (User.can(capability, userPermissions)) {
    next();
  } else {
    next({status:401,message:'Not Allow'});
  }
};
