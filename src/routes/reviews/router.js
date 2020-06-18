'use strict';

const express = require('express');
const reviewsModel = require('../../DB/subdocuments/reviews.js');
const router = express.Router();
router.post('/reviews', addReviewsHandler);
const reviewModel = require('../../DB/store/store.model.js');

function addReviewsHandler(req, res) {
  reviewsModel.create(req.body).then((data) => {
    res.json(data);
  })
    .catch((err) => res.status(403).send(err.message));
}

router.get('/:model',getAll);
router.post('/:model',post);
router.get('/:model/:id',getOne);
router.put('/:model/:id',update);
router.delete('/:model/:id',deleteHandler);

function getAll(req,res,next){
  console.log('GETALL');
  req.model.get()
    .then(results=>{
      let count = results.length;
      res.json({count,results});
    }).catch(next);
}

function post(req,res,next){
  req.model.create(req.body)
    .then(results=>{
      res.json(results);
    }).catch(next);
}

function deleteHandler(req,res,next){
  let id = req.params.id;
  req.model.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
function update(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

function getOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}


router.get('/reviews/read', (req, res, next) => {
  reviewModel.read().then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
});

router.post('/reviews/comment', (req, res, next) => {
  req.model.create(req.body)
    .then(results => {
      res.json(results);
    }).catch(next);
});

router.put('/reviews/rate', (req, res ,next) => {
  req.model.create(req.body)
    .then(results => {
      res.json(results);
    }).catch(next);
});

router.delete('/reviews/remove', (req, res , next)  => {
  let id = req.params.id;
  req.model.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
});

module.exports = router;
