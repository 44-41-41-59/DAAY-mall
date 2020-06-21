'use strict';
const schema = require('./orderspayment-schema.js');
class OrdersPaymentCollection {
  constructor() {
    this.schema = schema;
  }
  async read() {}
  async create(obj) {
    let recorde = this.schema.create();
    let resulte = recorde.save();
    return resulte;
  }
}
