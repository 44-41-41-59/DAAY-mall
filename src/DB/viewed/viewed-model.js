'use strict';

const viewedtSchema=require('./viwed-schema');

class viewedModel {
  constructor(schema){
    this.schema=schema;
  }
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
}

module.exports = new viewedModel(viewedtSchema);