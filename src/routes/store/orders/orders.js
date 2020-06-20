'use strict';

const orderModel = require('../../../DB/store/orders/orders.model.js');

function addOrder(req, res, next){
  try{
    orderModel.create(req.body).then(data=> {
      res.json(data);
    })
      .catch(next);

  } catch (e){
    res.send(e.message);
  }
}
function editOrder(req, res, next){
  try{
    orderModel.update(req.params.id, req.body).then(data=> res.json(data))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }
}
function getAllOrders(req, res, next){
  try{
    orderModel.read().then(data=> res.json({count:data.length,results:data}))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }  
}
function getOneOrder(req, res, next){
  try{
    orderModel.read({_id:req.params.id}).then(data=> res.json(data))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }    
}

function deleteOrder(req, res, next){
  try{
    orderModel.delete({_id:req.params.id}).then(data=> res.json(data))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }    
}

module.exports = {
  addOrder,
  editOrder,
  getAllOrders,
  getOneOrder,
  deleteOrder,
};