'use strict';

const cartType = require('./cart-schema');

class cartModel {
  constructor(schema) {
    this.schema = schema;
  }

  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({});
    }
    return await this.schema.find(obj);
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  delete(obj) {
    return this.schema.deleteMany(obj);
  }
  test(userID) {
    return this.schema.find({ userID }).populate('products');
  }
}

module.exports = new cartModel(cartType);
