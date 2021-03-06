'use strict';

const stripe = require('stripe')(process.env.SECERTSTRIPEKEY);

const viewedModel = require('../DB/viewed/viewed-model');
const payments = require('../DB/adminPaymentHistory/admin-payment-history.model');
const {order, payment, cart, review, product, store, wishlist} = require('../DB/collection-model'); //payment history //order


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
    const data = await store.read({ [key]: favoriteType });
    res.json({ count: data.length, results: data });
  }
  catch (e) {
    next(e.message);
  }
}

async function pay(req, res, next) {
  try{
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
    let savedPayment = await payment.create({ //payment history for USER
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
    await payments.create({ //payment history for ADMIN
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
  catch (e) {
    next(e.message);
  }
}


// get one product by id by USER/OWNER
async function getProductsById(req, res, next) {
  try{
    let products = await product.read({ _id: req.params.id });
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
  try{
    let storeProducts = await product.read({ storeID: req.params.store_id });
    let results = {
      count: storeProducts.length,
      results: storeProducts,
    };
    res.json(results);
  }
  catch (e) {
    next(e.message);
  }
}

// get reviews for one product or one store
async function getReviews(req, res, next) {
  try{
    let key, reviewType;
    if (req.query.productID) {
      key = 'productID';
      reviewType = req.query.productID;
    } else if (req.query.storeID) {
      key = 'storeID';
      reviewType = req.query.storeID;
    }

    const data = await review.read({ [key]: reviewType });
    res.json({ count: data.length, results: data });
  }
  catch (e) {
    next(e.message);
  }
}
// add one review on a product or a store
async function addReview(req, res, next) {
  try{
    if (req.query.productID) {
      req.body = { productID: req.query.productID };
    } else if (req.query.storeID) {
      req.body.storeID = req.query.storeID; //not sure
    }
    const data = await review.create(req.body);
    res.json(data);
  }
  catch (e) {
    next(e.message);
  }
}
// get all stores in the website
async function getOwnerAllStores(req, res, next) {
  try{
    const data = await store.read({ ownerID: req.params.owner_id });
    res.json({ count: data.length, results: data });
  }
  catch (e) {
    next(e.message);
  }
}

// get all pending stores in the admin dashboard
async function getPendingStores(req, res, next) {
  try{
    console.log('**********************');
    
    const data = await store.read({ status: 'pending' });
    res.json(data);
  }
  catch (e) {
    next(e.message);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const data = await order.read({ storeID: req.params.storeID });
    res.json({ count: data.length, results: data });
  } catch (e) {
    res.send(e.message);
  }
}

async function addProductsToWishlist(req, res, next) {
  try {
    let data = await wishlist.create(req.body);
    res.json(data);
  }
  catch (e) {
    next(e.message);
  }
}
async function addComplaint(req, res, next){
  try{
    let orderID = [];
    let id;
    let admiOrder = await payments.read({ paymentsHistory:  req.body.orderID});
    for(let i = 0; i < admiOrder.orders.length;i++){
      let index = admiOrder.orders[i].products.includes(req.body.productID)
      if(index) {
        id = admiOrder._id;
        orderID = admiOrder.orders[i]._id;
        admiOrder.invalid.push(admiOrder.orders[i]._id);
        admiOrder.orders.splice(i,1);
      }
    }

    let updata = await payments.update(id,admiOrder);
    let order =  await order.updata(orderID,{status:'bolcked'});
    res.send(`we block the orders with ids ${orderID} and informe the store with id ${order._id} `)
  }catch(e){
    console.log(e.message);
    next({status:500,message:e.message});
  }

}

module.exports = {
  getStoreProducts, getReviews, addReview, getOwnerAllStores, getPendingStores, getAllOrders, addProductsToWishlist,updateHandler, addHandler, getHandler, getProductsById, getFavorite, pay, getByUserHandler, getByIdHandler, deleteHandler, deleteByIdHandler,addComplaint,
};
