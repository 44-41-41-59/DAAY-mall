'use strict';

const favoriteModel = require('../../DB/favorite/favorite.model');

function getFavorite(req, res, next){
  let key, favoriteType;
  if( req.query.storeID){
    key = 'storeID';
    favoriteType = req.query.storeID;
  }
  favoriteModel.read({[key]:favoriteType}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

function getOneFavorite(req, res, next){
  favoriteModel.read({_id:req.params.id}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

function addFavorite(req, res, next){
  if ( req.query.storeID){
    req.body.storeID = req.query.storeID; 
  }
  favoriteModel.create(req.body)
    .then(results => {
      res.json(results);
    }).catch(next);
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