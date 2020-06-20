'use strict';

const reviewsSchema = require('./reviews-schema.js');

class reviewModel {
  constructor(schema) {
    this.schema = schema;
  }

  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({});
    }
    return await this.schema.find(obj);
  }

  create(record) {
    console.log('uuuuuuuuuuuuuuuuuuuuuuu', record);
    let newRecord = new this.schema(record);
    console.log('nnnnnnnnnnnnnnnnnnnnnnn', record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = new reviewModel(reviewsSchema);
