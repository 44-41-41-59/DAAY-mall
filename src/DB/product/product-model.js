'use strict';

const productSchema=require('./product-schema');

class productModel {
  constructor(schema) {
    this.schema = schema;
  }

  async read(id) {
    if (id === undefined) {
      return await this.schema.find({});
    }
    return await this.schema.find({ _id: id });
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

module.exports = new productModel(productSchema);
