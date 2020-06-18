'use strict';
module.exports = (capability) => {
  return (req,res,next)=> {
    try{
      console.log('hey capabilities', req.user.capabilities);
      if (req.user.capabilities.includes(capability)){
        next();
      } else {
        next('Access denied');
      }
    } catch (e) {
      next('Invalid login');
    }
  };
};


