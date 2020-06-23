'use strict';

const {favorite,store} = require('../../DB/collection-models');

function getFavorite(req, res, next){
  let key, favoriteType;
  if( req.query.storeID){
    key = 'storeID';
    favoriteType = req.query.storeID;
  }
  store.read({[key]:favoriteType}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}


function getOneFavorite(req, res, next){
  favorite.read({_id:req.params.id}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

function addFavorite(req, res, next){
  let storeID = req.body.storeID;
  store.read({_id:storeID}).then((data) =>{
    data.userID = req.body.userID;
    return favorite.create(data);
  }).then((result)=>{
    res.json({favoriteModel: result}) ; 
  }) 
    .catch(next);
}

function deleteFavorite (req, res , next){
  let id = req.params.id;
  favorite.delete(id)
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