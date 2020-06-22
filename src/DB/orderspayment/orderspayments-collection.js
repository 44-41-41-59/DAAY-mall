'use strict';
const schema = require('./orderspayment-schema.js');
class OrdersPaymentCollection {
  constructor() {
    this.schema = schema;
  }
  async read() {}
  async create(obj) {
    let recorde = new this.schema(obj);
    let resulte = recorde.save();
    return resulte;
  }
}
module.exports = new OrdersPaymentCollection();
