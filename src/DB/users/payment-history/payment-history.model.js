'use strict';

const paymentHistorySchema = require('./payment-history.schema.js');

class paymentHistoryModel {
  constructor(schema) {
    this.schema = schema;
  }

  test(record) {}

  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({}).populate('productID');
    }
    return await this.schema.find(obj).populate('productID');
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema
      .findByIdAndUpdate(_id, record, { new: true })
      .populate('productID');
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = new paymentHistoryModel(paymentHistorySchema);
