'use strict';
const storeSchema = require('./store-schema.js');
'use strict';


class Model {

  constructor(schema) {
    this.schema = schema;
  }
  read(_id) {
    const queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }
  /** Method to create a new record and save it to the db */
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }
  /** Method to find a record in db using id and update it */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /** Method to find a record in db using id and delete it */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

class StoreModel extends Model {
  constructor() {
    super(storeSchema);
  }
}

let storeModel= new StoreModel(storeSchema);

module.exports = storeModel;