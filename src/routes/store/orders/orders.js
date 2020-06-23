'use strict';

const {order} = require('../../../DB/collection-models');

function addOrder(req, res, next){
  try{
    order.create(req.body).then(data=> {
      res.json(data);
    })
      .catch(next);

  } catch (e){
    res.send(e.message);
  }
}
function editOrder(req, res, next){
  try{
    order.update(req.params.id, req.body).then(data=> res.json(data))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }
}
function getAllOrders(req, res, next){
  try{
    order.read().then(data=> res.json({count:data.length,results:data}))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }  
}
function getOneOrder(req, res, next){
  try{
    order.read({_id:req.params.id}).then(data=> res.json(data))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }    
}

function deleteOrder(req, res, next){
  try{
    order.delete({_id:req.params.id}).then(data=> res.json(data))
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