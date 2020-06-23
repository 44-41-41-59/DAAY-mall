'use strict';
const schema = require('./admin-payment-history.schema.js');
class AdminPaymentHistory {
  constructor() {
    this.schema = schema;
  }
  read(queryObject = {}) {
    return this.schema.find(queryObject);
  }  
  async create(obj) {
    let record = new this.schema(obj);
    let result = record.save();
    return result;
  }
  async update(_id, record) {
    return this.schema.findOneAndUpdate(_id, record, { new: true });
  }
}
module.exports = new AdminPaymentHistory();