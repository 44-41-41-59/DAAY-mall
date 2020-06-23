'use strict';

const favoriteSchema = require('./favorite/favorite-schema');
const cartSchema = require('./cart/cart-schema');
const productSchema=require('./product/product-schema');
const reviewsSchema = require('./review/reviews-schema');
const storeSchema = require('./store/store-schema');
const orderSchema  = require('./store/orders/ordering-schema');
const paymentHistorySchema = require('./users/payment-history/payment-history.schema');
const wishlistSchema = require('./whishlist/wishlist-schema');

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  read(queryObject = {}) {
    return this.schema.find(queryObject);
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

class FavoriteModel extends Model {
  constructor() {
    super(favoriteSchema);
  }
}

class CartModel extends Model {
  constructor() {
    super(cartSchema);
  }
  test(userID) {
    return this.schema.find({ userID }).populate('products');
  }
}

class ProductModel extends Model {
  constructor() {
    super(productSchema);
  }
}

class ReviewsModel extends Model {
  constructor() {
    super(reviewsSchema);
  }
}

class StoreModel extends Model {
  constructor() {
    super(storeSchema);
  }
  read(obj) {
    return this.schema.find(obj).populate('products').populate('reviews').populate('orders');
  }
}

class OrdersModel extends Model {
  constructor() {
    super(orderSchema);
  }
  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({}).populate('products').exec(); //populate with same field name
    }
    return await this.schema.find(obj).populate('products').exec(); //populate with same field name
  }
}

class PaymentHistoryModel extends Model {
  constructor() {
    super(paymentHistorySchema);
  }
  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({}).populate('productID');
    }
    return await this.schema.find(obj).populate('productID');
  }
  update(_id, record) {
    return this.schema
      .findByIdAndUpdate(_id, record, { new: true })
      .populate('productID');
  }
}
class WishlistModel extends Model {
  constructor() {
    super(wishlistSchema);
  }
  read(obj){
    return this.schema.find(obj).populate('productID');
  }
}

module.exports.favorite = new FavoriteModel();
module.exports.cart = new CartModel();
module.exports.product = new ProductModel();
module.exports.review = new ReviewsModel();
module.exports.store = new StoreModel();
module.exports.order = new OrdersModel();
module.exports.payment = new PaymentHistoryModel();
module.exports.wishlist = new WishlistModel();

// module.exports = Model;