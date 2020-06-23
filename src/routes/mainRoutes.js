const express = require('express');
const router = express.Router();
const bearer = require('../middlewares/auth/bearer');
const permissions = require('../middlewares/auth/authorize');
const getModel = require('../middlewares/model-finder');

const {
  getFavorite,  
  pay, getProductsById, 
  getStoreProducts, getReviews, addReview, getOwnerAllStores, getPendingStores,
  getAllOrders, addProductsToWishlist, deleteHandler,getByIdHandler,deleteByIdHandler,getByUserHandler,getHandler,addHandler, updateHandler,
} = require('./handlers.js');

router.route('/favorite').get(bearer('registered'), getFavorite);
router.route('/charge').post(pay);
// router.route('/products/:id').get(bearer('none'),getProductsById);
router.route('/products/store/:store_id').get(getStoreProducts);
router.route('/store/store/:owner_id').get(getOwnerAllStores);
router.route('/review').get(getReviews).post(addReview); //with query
router.route('/order/store/:storeID').get(getAllOrders);
router.route('/store/admin/dashboard').get(bearer('registered'), permissions('readPendingStores'),getPendingStores);
router.post('/wishlist',addProductsToWishlist); // pass the userID in the token

router.param('model', getModel);
router.route('/:model').get(getHandler);
router.route('/:model/:userID').get(getByUserHandler).delete(deleteHandler);
router.route('/:model/:model/:id').get(getByIdHandler).put(updateHandler).delete(deleteByIdHandler);
router.route('/:model').post(addHandler);

module.exports=router;



// create payment history and send all orders for each store
// router.route('/charge').post(pay);

// routes

// get all favorite stores for one user // add one store to user's favorite stores list
// router.route('/favorite').get(bearer('registered'), getFavorite);
// post(bearer('registered'), addFavorite);.
// delete one store from user's favorite list
// router.route('/favorite/:id').delete(deleteFavorite);

// get all carts for one user // add an item(product) to the cart
// router.route('/cart/:userID').get(getCart);
// router.route('/cart').post(addCart);s
// get one item from one cart (shows the amount for the product) // patch(edit amount of the product) // delete 
// router.route('/cart/:id').get(getOneCart).patch(editCart).delete(deleteCart);


// get payment history for one user
// router.route('/payment/history/all/:user_id').get(getPaymentHistory);
// get or delete one item form the payment history
// router.route('/payment/history/:id').get(getOnePaymentHistory);
// router.route('/payment/history/:id').delete(deletePaymentHistory);


// get all products from all stores by USER
// router.route('/products').get(getProducts);
// get one product from all stores by USER/OWNER
// router.route('/products/:id').get(bearer('none'),getProductsById);
// add products for each store by OWNER
// router.route('/products').post(bearer('registered'), permissions('create'), addProductsHandler);
// update each product by id by OWNER
// router.route('/products/:id').put(bearer('registered'), permissions('update'), updateProducts);
// delete each product by id by OWNER
// router.route('/products/:id').delete(bearer('registered'), permissions('delete'), deleteProducts);
// get all products of a specific store
// router.route('/products/:store_id').get(getStoreProducts);

//get all reviews for one product or store or if you dont put query you will get all the reviews for everything/ add one review to a product (you should pass the productID as a query)
// router.route('/review').get(getReviews).post(addReview);
// get one review on a specific product or store / edit one review on a product or store/ delete one review on a product or a store
// router.route('/review/:id').get(getOneReview);
// router.route('/review/:id').put(editReview);
// .delete(deleteReview);

// get all orders for one store
// router.route('/order/store/:storeID').get(getAllOrders);
// router.route('/order/:id').get(getOneOrder);
// router.route('/order/:id').patch(editOrder);
// .delete(deleteOrder); // delete only if status is delivered

// create new store by USER/ get all stores by USER
// router.route('/store').post(addStore).get(getAllStores);
// get all pending stores in the admin dashboard
// router.route('/store/admin/dashboard').get(bearer, permissions('readPendingStores'),getPendingStores);
// get all the stores owned by one owner by USER
// router.route('/store/:owner_id').get(getOwnerAllStores);
// get one store by store ID by USER/  edit one store by OWNER / edit one store status by ADMIN / delete one store by OWNER and ADMIN 
// router.route('/store/:store_id').get(getOneStore);
// router.route('/store/:store_id').put(bearer, permissions('update'), editStore).patch(bearer, permissions('updateStoreStatus'), editStore);
// .delete(bearer, permissions('delete'), deleteStore);

// get wish-list 
// router.get('/wishlist/:userID',getWishlist);
// router.post('/wishlist',addProductsToWishlist); // pass the userID in the token
// router.put('/wishlist/user/:id',updateWishlist);
// router.delete('/wishlist/user/:id',deleteFromWishlist);



