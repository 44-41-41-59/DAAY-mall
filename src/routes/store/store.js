'use strict';
const {store} = require('../../DB/collection-models');

// get all stores in the website
function getAllStores(req, res, next){
  store.read().then((data)=> {
    res.json({count: data.length, results:data, products:data.products});
  })
    .catch(next);     
}
// get all stores in the website
function getOwnerAllStores(req, res, next){
  store.read({ownerID:req.params.owner_id}).then((data)=> res.json({count: data.length, results:data}))
    .catch(next);     
}
// USER get one store by id
function getOneStore(req, res, next){
  store.read({_id:req.params.store_id}).then((data)=> res.json(data))
    .catch(next);   
}
// OWNER add new store 
function addStore(req, res, next){
  try{
    store.create(req.body).then(data=> {
      res.json(data);
    })
      .catch(next);

  } catch (e){
    res.send(e.message);
  }
}
// OWNER edit store detail by store id/ admin patch each store to change its status by store id
function editStore(req, res, next){
  store.update({_id:req.params.store_id}, req.body).then(data=> res.json(data))
    .catch(next); 
}
// OWNER delete store/ ADMIN delete store
function deleteStore(req, res, next){
  // should also delete all products that has the store ID 
  store.delete({_id:req.params.store_id}).then(data=> res.json(data))
    .catch(next);  
}
// get all pending stores in the admin dashboard
function getPendingStores(req, res, next){
  store.read({status: 'pending'}).then(data=> res.json(data))
    .catch(next);  
}

module.exports = {
  getAllStores,
  getOwnerAllStores,
  getOneStore,
  addStore,
  editStore,
  deleteStore,
  getPendingStores,
};