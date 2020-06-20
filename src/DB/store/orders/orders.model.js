'use strict';

const orderSchema=require('./ordering-schema.js');

class orderModel {
  constructor(schema) {
    this.schema = schema;
  }

  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({}).populate('products').exec(); //populate with same field name
    }
    return await this.schema.find(obj).populate('products').exec(); //populate with same field name
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

module.exports = new orderModel(orderSchema);
