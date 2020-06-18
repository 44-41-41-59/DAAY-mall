'use strict';
const storeModel = require('../../DB/store/store.model.js');

function getAllStores(req, res, next){
  storeModel.read().then((data)=> res.json({count: data.length, results:data}))
    .catch(next);     
}
function getOneStore(req, res, next){
  storeModel.read(req.params.id).then((data)=> res.json(data))
    .catch(next);   
}
function addStore(req, res, next){
  try{
    //  StoreModel { schema: Model { store } }
    storeModel.create(req.body).then(data=> {
      res.json(data);
    })
      .catch(next);

  } catch (e){
    res.send(e.message);
  }

}
function editStore(req, res, next){
  storeModel.update(req.params.id, req.body).then(data=> res.json(data))
    .catch(next); 
}
function deleteStore(req, res, next){
  storeModel.delete(req.params.id).then(data=> res.json(data))
    .catch(next);  
}

// admin patch each store to change its status.

module.exports = {
  getAllStores,
  getOneStore,
  addStore,
  editStore,
  deleteStore,
};