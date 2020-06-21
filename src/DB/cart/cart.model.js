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
  
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = new cartModel(cartType);
