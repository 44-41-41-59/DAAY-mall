'use strict';
const schema = require('./product-schema.js');

class ProductCollection {
  constructor() {
    this.schema = schema;
  }
  async read(id) {
    if (id === undefined) {
      return await this.schema.find({});
    }
  }
}
