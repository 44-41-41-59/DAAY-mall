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

  // async creat() {
  //   let obj = {
  //     name: 'jflkdsj',
  //     price: '5',
  //     amount: 6,
  //     description: 'hello my finds',
  //     category: 'bombom',
  //   };
  //   let tet = new this.schema(obj);
  //   tet.save();
  //   return tet;
  // }
}

module.exports = new ProductCollection();
