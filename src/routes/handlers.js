'use strict';

const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);

const orderModel = require('../DB/store/orders/orders.model');
const wishListModel = require('../DB/whishlist/whishlist-model');
const storeModel = require('../DB/store/store.model');
const productsModel = require('../DB/product/product-model');
const viewedModel = require('../DB/viewed/viewed-model');
const reviewModel = require('../DB/review/review.model');
const cart = require('../DB/cart/cart.model.js');
const payments = require('../DB/orderspayment/orderspayments-collection');
const payementHistoryModel = require('../DB/users/payment-history/payment-history.model');
const order = require('../DB/store/orders/orders.model.js');


// function that gets wishlist, cart and payment history by passing user id as a param

// async function updateHandler(req, res, next) {
//   try {
//     let id = req.params.id;
//     const data = await req.model.update(id, req.body);
//     res.json(data);
//   } catch (e) {
//     next(e.message);
//   }
// }

async function getHandler(req, res, next) {
  try{
    const data = await req.model.read();
    res.json({ results: data });
  }
  catch (e) {
    next(e.message);
  }
}

async function getByUserHandler(req, res, next) {
  try{
    const data = await req.model.read({ userID: req.params.userID });
    res.json({ results: data[0] });
  }
  catch (e) {
    next(e.message);
  }
}

// get one paymenthistory, cart, review, order, store
async function getByIdHandler(req, res, next) {
  try{
    const data = await req.model.read({ _id: req.params.id });
    res.json({ count: data.length, results: data });
  }
  catch(e){
    next(e.message);
  }
}
async function deleteHandler(req, res, next) {
  try{
    const data = await  req.model.delete({ userID: req.params.userID });
    res.json(data);
  }
  catch(e){
    next(e.message);
  }
}

async function deleteByIdHandler(req, res, next) {
  try{
    const data = await req.model.delete(req.params.id);
    res.json(data);
  }
  catch(e){
    next(e.message);
  }
}

async function addHandler(req, res, next) {
  try{
    const data = await req.model.create(req.body);
    res.json(data);
  }
  catch(e){
    next(e.message);
  }
}

async function updateHandler(req, res, next) {
  try {
    let id = req.params.id;
    const data = await req.model.update(id, req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

//-----------------------------------------------------------------------------

async function getFavorite(req, res, next) {
  try {
    let key, favoriteType;
    if (req.query.storeID) {
      key = 'storeID';
      favoriteType = req.query.storeID;
    }
    const data = await storeModel.read({ [key]: favoriteType });
    res.json({ count: data.length, results: data });
  }
  catch (e) {
    next(e.message);
  }
}

async function pay(req, res, next) {
  // for later bring user id from token
  let obj = {};
  let storeProductIDs = [];
  let amount = 0; // it should be called amount for stripe DONT change it 
  let cartArr = await cart.test(req.body.userID); // array of object(cart based on user populated with products)
  cartArr.forEach((element) => {
    storeProductIDs.push(element.products._id);
    amount += element.products.price;
    if (obj[element.products.storeID])
      obj[element.products.storeID].push(element.products._id);
    else obj[element.products.storeID] = [element.products._id]; // create array for the store to store the product ids
  });
  let savedPayment = await payementHistoryModel.create({
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


// get one product by id by USER/OWNER
async function getProductsById(req, res, next) {
  try{
    let products = await productsModel.read({ _id: req.params.id });
    let result = {
      count: products.length,
      results: products,
    };
    if (req.user) {
      if (req.user.id) {
        products.userID = req.user.id;
        let viewed = await viewedModel.create(products);
        res.json(viewed);
      }
    }
    else {
      res.json(result);
    }

  }
  catch (e) {
    next(e.message);
  }

}

// get all products for each store by store id by OWNER/USER
async function getStoreProducts(req, res, next) {
  let storeProducts = await productsModel.read({ storeID: req.params.store_id });
  let results = {
    count: storeProducts.length,
    results: storeProducts,
  };
  res.json(results);
}
//-------------------------------------------------------------------------------------------------------
// get reviews for one product or one store
function getReviews(req, res, next) {
  let key, reviewType;
  if (req.query.productID) {
    key = 'productID';
    reviewType = req.query.productID;
  } else if (req.query.storeID) {
    key = 'storeID';
    reviewType = req.query.storeID;
  }
  reviewModel.read({ [key]: reviewType }).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}
// add one review on a product or a store
function addReview(req, res, next) {
  if (req.query.productID) {
    req.body = { productID: req.query.productID };
  } else if (req.query.storeID) {
    req.body.storeID = req.query.storeID; //not sure
  }
  reviewModel.create(req.body)
    .then(results => {
      res.json(results);
    }).catch(next);
}
//------------------------------------------------------------------------------------

// get all stores in the website
function getOwnerAllStores(req, res, next) {
  storeModel.read({ ownerID: req.params.owner_id }).then((data) => res.json({ count: data.length, results: data }))
    .catch(next);
}

// get all pending stores in the admin dashboard
function getPendingStores(req, res, next) {
  storeModel.read({ status: 'pending' }).then(data => res.json(data))
    .catch(next);
}

function getAllOrders(req, res, next) {
  try {
    orderModel.read({ storeID: req.params.storeID }).then(data => res.json({ count: data.length, results: data }))
      .catch(next);

  } catch (e) {
    res.send(e.message);
  }
}

async function addProductsToWishlist(req, res, next) {
  try {
    let data = await wishListModel.create(req.body);
    res.json(data);
  }
  catch (e) {
    next(e.message);
  }
}

module.exports = {
  getStoreProducts, getReviews, addReview, getOwnerAllStores, getPendingStores, getAllOrders, addProductsToWishlist,updateHandler, addHandler, getHandler, getProductsById, getFavorite, pay, getByUserHandler, getByIdHandler, deleteHandler, deleteByIdHandler,
};
