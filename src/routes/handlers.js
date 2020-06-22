'use strict';


function getModel(req, res, next) {
  const model = req.params.model;
  switch (model) {
  case 'cart':
    req.model = cartModel;
    next();
    return;
  case 'wishlist':
    req.model = wishListModel;
    next();
    return;
  case 'payment':
    req.model = payementHistoryModel;
    next();
    return;  
  case 'review':
    req.model = reviewModel;
    next();
    return;  
  case 'order':
    req.model = orderModel;
    next();
    return;  
  case 'store':
    req.model = storeModel;
    next();
    return;  
  default:
    next('invalid model');
    return;
  }
}
// function that gets wishlist, cart and payment history by passing user id as a param
function getHandler(req, res, next) {
  req.model.read({userID: req.params.userID}).then((data) => res.json({results:data[0]}))
    .catch(next);
}
// get one paymenthistory, cart, review, order, store
function getByIdHandler(req, res, next){
  req.model.read({ _id: req.params.id }).then((data) => res.json({ count: data.length, results: data }))
    .catch(next); 
}
function deleteHandler(req, res, next){
  cartModel.delete({ userID: req.params.userID }).then((record) => res.json(record))
    .catch(next);
}


/// cart handlers----------------------------------------------------
const cartModel = require('../DB/cart/cart.model');

// function getCart(req, res, next) {
//   cartModel.read({userID: req.params.userID}).then((data) => res.json({results:data[0]}));
// }
// function getOneCart(req, res, next) {
//   cartModel
//     .read({ _id: req.params.id })
//     .then((data) => res.json({ count: data.length, results: data }))
//     .catch(next);
// }
function addCart(req, res, next) {
  cartModel
    .create(req.body)
    .then((results) => {
      res.json(results);
    })
    .catch(next);
}
// function editCart(req, res, next){
//   cartModel.update()
// }

// function deleteCart(req, res, next) {
//   let userID = req.params.id;
//   console.log(userID);
//   cartModel
//     .delete({ userID })
//     .then((record) => {
//       res.json(record);
//     })
//     .catch(next);
// }

// Favorites---------------------------------------------------------------------

const favoriteModel = require('../DB/favorite/favorite.model');
const storeModel= require('../DB/store/store.model');

function getFavorite(req, res, next){
  let key, favoriteType;
  if( req.query.storeID){
    key = 'storeID';
    favoriteType = req.query.storeID;
  }
  storeModel.read({[key]:favoriteType}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

function addFavorite(req, res, next){
  let storeID = req.body.storeID;
  storeModel.read({_id:storeID}).then((data) =>{
    data.userID = req.body.userID;
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

// charge-------------------------------------------------------

const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);
const cart = require('../DB/cart/cart.model.js');
const payments = require('../DB/orderspayment/orderspayments-collection');
const payementHistoryModel = require('../DB/users/payment-history/payment-history.model');
const order = require('../DB/store/orders/orders.model.js');
// const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);


async function pay(req, res, next) {
  // for later bring user id from token
  let obj = {}; 
  let storeProductIDs = [];
  let amount = 0; // it should be called amount for stripe DONT change it 
  let cartArr = await cart.test(req.body.userID); // array of object(cart based on user populated with products)
  console.log('anolla', cartArr);
  cartArr.forEach((element) => {
    storeProductIDs.push(element.products._id);
    amount += element.products.price;
    if (obj[element.products.storeID])
      obj[element.products.storeID].push(element.products._id);
    else obj[element.products.storeID] = [element.products._id]; // create array for the store to store the product ids
  });
  let savedPayment= await payementHistoryModel.create({
    userID: req.body.userID,
    productID: storeProductIDs,
    cost: amount,
  });
  let ordersIDs = [];
  for (let key in obj) {
    let savedOrder = await order.create({
      storeID: key,
      products: obj[key],
      userID: req.body.userID,
    });
    ordersIDs.push(savedOrder._id);
  }
  await payments.create({
    paymentsHistory: savedPayment._id,
    userID: req.body.userID,
    orders: ordersIDs,
  });
  res.json(cartArr);

  // DONT DELETE Comment-----------------------------------------

  // stripe.customers
  // .create({
  //   email: req.body.stripeEmail,
  //   source: req.body.stripeToken,
  // })
  // .then((customer) => {
  //   stripe.charges.create({
  //     amount,
  //     description: 'DAAY-mall check',
  //     currency: 'usd',
  //     customer: customer.id,
  //   });
  // })
  // .then((charge) => {

  //   res.send('done');
  // })
  // .catch((e) => next({ status: 500, message: e.message }));
}


// Payment history----------------------------------------------

// get all of the payment history for one user
// function getPaymentHistory(req, res, next){
//   payementHistoryModel.read({userID:req.params.user_id}).then(data=> res.json({count:data.length, results:data}));
// }

// delete one item form the payment history
function deletePaymentHistory(req, res, next){
  payementHistoryModel.delete(req.params.id).then(data=>res.send(`Payment history ${req.params.id} deleted.`));
}
// get one item form a payment history 
// function getOnePaymentHistory(req, res, next){
//   payementHistoryModel.read({_id:req.params.id}).then(data=>res.json({paymentHistory:data[0]}));
// }

// Product -----------------------------------------------------

const productsModel = require('../DB/product/product-model');
const viewedModel=require('../DB/viewed/viewed-model');

// add products for each store by OWNER
function addProductsHandler(req,res){
  console.log(req.user);
  productsModel.create(req.body).then((data) => {
    res.json(data);
  })
    .catch((err) => res.status(403).send(err.message));
}

// get all products from all stores by USER
async function getProducts(req, res, next) {
  //   await product.creat();
  let products = await productsModel.read();
  let result = {
    count: products.length,
    resultes: products,
  };
  res.json(result);
}

// get one product by id by USER/OWNER
async function getProductsById(req, res, next) {
  let products = await productsModel.read({_id:req.params.id});
  let result = {
    count: products.length,
    results: products,
  };
  console.log(req.user);
  if(req.user){
    if (req.user.id){
      products.userID=req.user.id;
      // console.log(products,'----------------------------');
      let viewed = await viewedModel.create(products);
      res.json(viewed);
    }
  }
  else{
    res.json(result);
  }
}
// update each product by id by OWNER
async function updateProducts(req,res,next){
  try {
    let id = req.params.id;
    const data = await productsModel.update(id,req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}
// delete each product by id by OWNER
async function deleteProducts(req,res,next){
  try {
    let id = req.params.id;
    await productsModel.delete(id);
    res.json('Product is Deleted');
  } catch (e) {
    next(e.message);
  }
}
// get all products for each store by store id by OWNER/USER
async function getStoreProducts(req,res,next){
  let storeProducts = await productsModel.read({storeID: req.params.store_id});
  let results = {
    count: storeProducts.length,
    results: storeProducts,
  };
  res.json(results);
}

// Reviews -----------------------------------------------------

const reviewModel = require('../DB/review/review.model');

// get reviews for one product or one store
function getReviews(req, res, next){
  let key, reviewType;
  if(req.query.productID){
    key = 'productID';
    reviewType = req.query.productID;
  } else if ( req.query.storeID){
    key = 'storeID';
    reviewType = req.query.storeID;
  }
  reviewModel.read({[key]:reviewType}).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

// get a specifc review on one product or one store // can be refactored to be joined with the previous function
// function getOneReview(req, res, next){
//   reviewModel.read({_id:req.params.id}).then((data) => res.json({ count: data.length, results: data }))
//     .catch(next);
// }

// add one review on a product or a store
function addReview(req, res, next){
  if(req.query.productID){
    req.body = {productID: req.query.productID};
  } else if ( req.query.storeID){
    req.body.storeID = req.query.storeID; //not sure
  }
  reviewModel.create(req.body)
    .then(results => {
      res.json(results);
    }).catch(next);
}

function deleteReview (req, res , next){
  let id = req.params.id;
  reviewModel.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

function editReview (req, res , next){
  let id = req.params.id;
  reviewModel.update(id, req.body)
    .then(record=>{
      res.json(record);
    }).catch(next);
}


// Store -------------------------------------------------------

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
// function getOneStore(req, res, next){
//   storeModel.read({_id:req.params.store_id}).then((data)=> res.json(data))
//     .catch(next);   
// }
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
  storeModel.update({_id:req.params.store_id}, req.body).then(data=> res.json(data))
    .catch(next); 
}
// OWNER delete store/ ADMIN delete store
function deleteStore(req, res, next){
  // should also delete all products that has the store ID 
  storeModel.delete({_id:req.params.store_id}).then(data=> res.json(data))
    .catch(next);  
}
// get all pending stores in the admin dashboard
function getPendingStores(req, res, next){
  storeModel.read({status: 'pending'}).then(data=> res.json(data))
    .catch(next);  
}


// Orders ------------------------------------------------------

const orderModel = require('../DB/store/orders/orders.model');

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
    orderModel.read({storeID: req.params.storeID}).then(data=> res.json({count:data.length,results:data}))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }  
}
// function getOneOrder(req, res, next){
//   try{
//     orderModel.read({_id:req.params.id}).then(data=> res.json(data))
//       .catch(next); 

//   } catch (e){
//     res.send(e.message);
//   }    
// }

function deleteOrder(req, res, next){
  try{
    orderModel.delete({_id:req.params.id}).then(data=> res.json(data))
      .catch(next); 

  } catch (e){
    res.send(e.message);
  }    
}

// Wish-list ---------------------------------------------------

const wishListModel =require('../DB/whishlist/whishlist-model');


// async function getWishlist (req,res,next){
//   try{
//     let userID= req.params.userID;
//     let data = await wishListModel.read(userID);
//     res.json(data);
//   }
//   catch(e) {
//     next(e.message);
//   }
// }

async function addProductsToWishlist (req,res,next){
  try{
    let data = await wishListModel.create(req.body);
    res.json(data);
  }
  catch(e) {
    next(e.message);
  }
}

async function updateWishlist(req,res,next){
  try {
    let id = req.params.id;
    const data = await wishListModel.update(id,req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

async function deleteFromWishlist(req,res,next){
  try {
    let id = req.params.id;
    await wishListModel.delete(id);
    res.json('Item is Deleted');
  } catch (e) {
    next(e.message);
  }
}
//--------------------------------------------------------------











module.exports = {
  
  addCart,
  getFavorite,
  addFavorite,
  deleteFavorite,

  pay,

  deletePaymentHistory,
  addProductsHandler,
  getProducts,
  getProductsById,
  updateProducts,
  deleteProducts,
  getStoreProducts,
  getReviews,
  addReview,
  editReview,
  deleteReview,
  getAllStores,
  getOwnerAllStores,
  addStore,
  editStore,
  deleteStore,
  getPendingStores,
  editOrder,
  getAllOrders,
  deleteOrder,
  addProductsToWishlist,
  updateWishlist,
  deleteFromWishlist,

  getModel,
  getHandler,
  getByIdHandler,
  deleteHandler,
};
