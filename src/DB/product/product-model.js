'use strict';

const jwt = require('jsonwebtoken');
const SECRET ='secret';
const productSchema=require('./product-schema');

class productModel {
  constructor(schema) {
    this.schema = schema;
  }
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  generateToken(product){
    const token = jwt.sign({username: product.username ,id:product._id }, SECRET);
    return token;
    // exp: Math.floor(Date.now() / 1000) + (15 * 60),capabilities:product.acl ? product.acl.capabilities : [],type: product.type || 'user'
  }


}

module.exports = new productModel(productSchema);
