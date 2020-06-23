'use strict';

const wishlistSchema=require('./wishlist-schema');

class wishlistModel {
  constructor(schema){
    this.schema=schema;
  }

  read(obj){
    return this.schema.find(obj).populate('productID');
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

module.exports = new wishlistModel(wishlistSchema);