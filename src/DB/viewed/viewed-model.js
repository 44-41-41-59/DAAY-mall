'use strict';

const viewedtSchema=require('./viewed-schema');

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