'use strict';
const payementHistoryModel = require('../../../DB/users/payment-history/payment-history.model.js');

// get all of the payment history for one user
function getPaymentHistory(req, res, next){
  payementHistoryModel.read({userID:req.params.user_id}).then(data=> res.json({count:data.length, results:data}));
}
// add one item to the payment history
function addPaymentHistory(req, res, next){
  payementHistoryModel.create(req.body).then(data=>res.json({result:data}));
}
// delete one item form the payment history
function deletePaymentHistory(req, res, next){
  payementHistoryModel.delete(req.params.id).then(data=>res.send(`Payment history ${req.params.id} deleted.`));
}
// get one item form a payment history 
function getOnePaymentHistory(req, res, next){
  payementHistoryModel.read({_id:req.params.id}).then(data=>res.json({paymentHistory:data[0]}));
}

module.exports = {
  getPaymentHistory,
  addPaymentHistory,
  deletePaymentHistory,
  getOnePaymentHistory, 
};