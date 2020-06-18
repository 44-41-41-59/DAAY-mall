'use strict';

const jwt = require('jsonwebtoken');
const SECRET ='secret';
const productSchema=require('./product-schema');

class productModel {
  constructor(schema) {
    this.schema = schema;
  }

  async read(id) {
    if (id === undefined) {
      return await this.schema.find({});
    }
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

}

module.exports = new productModel(productSchema);
