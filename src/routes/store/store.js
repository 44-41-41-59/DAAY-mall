'use strict';
const storeModel = require('../../DB/store/store.model.js');

// get all stores in the website
function getAllStores(req, res, next){
  storeModel.read().then((data)=> {
    res.json({count: data.length, results:data, products:data.products});
  })
    .catch(next);     
}
// get all stores in the website
function getOwnerAllStores(req, res, next){
  storeModel.read({ownerID:req.params.owner_id}).then((data)=> res.json({count: data.length, results:data}))
    .catch(next);     
}
// USER get one store by id
function getOneStore(req, res, next){
  storeModel.read(req.params.store_id).then((data)=> res.json(data))
    .catch(next);   
}
// OWNER add new store 
function addStore(req, res, next){
  try{
    storeModel.create(req.body).then(data=> {
      res.json(data);
    })
      .catch(next);

  } catch (e){
    res.send(e.message);
  }
}
// OWNER edit store detail by store id/ admin patch each store to change its status by store id
function editStore(req, res, next){
  storeModel.update(req.params.store_id, req.body).then(data=> res.json(data))
    .catch(next); 
}
// OWNER delete store/ ADMIN delete store
function deleteStore(req, res, next){
  // should also delete all products that has the store ID 
  storeModel.delete(req.params.store_id).then(data=> res.json(data))
    .catch(next);  
}

module.exports = {
  getAllStores,
  getOwnerAllStores,
  getOneStore,
  addStore,
  editStore,
  deleteStore,
};