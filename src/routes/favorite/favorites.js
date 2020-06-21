'use strict';

const favoriteModel = require('../../DB/favorite/favorite.model');
const storeModel= require('../../DB/store/store.model');
const userModel = require('../../DB/users/user-model');

function getFavorite(req, res, next){
  let key, favoriteType;
  if( req.query.storeID){
    key = 'storeID';
    favoriteType = req.query.storeID;
  }
  storeModel.read({[key]:favoriteType}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}


function getOneFavorite(req, res, next){
  favoriteModel.read({_id:req.params.id}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

function addFavorite(req, res, next){
  let storeID = req.body.storeID;
  storeModel.read({_id:storeID}).then((data) =>{
    data.userID = req.body.userID;
    console.log('DATAAAAAAAAAA',data);
    return favoriteModel.create(data);
  }).then((result)=>{
    res.json({favoriteModel: result}) ; 
  }) 
    .catch(next);
}

function deleteFavorite (req, res , next){
  let id = req.params.id;
  favoriteModel.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}


module.exports = {
  getFavorite,
  getOneFavorite,
  addFavorite,
  deleteFavorite,
};