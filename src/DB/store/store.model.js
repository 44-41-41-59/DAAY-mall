'use strict';
const storeSchema = require('./store-schema.js');
'use strict';


class Model {

  constructor(schema) {
    this.schema = schema;
  }
  read(obj) {
    return this.schema.find(obj).populate('products').populate('reviews').populate('orders');
  }
  /** Method to create a new record and save it to the db */
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }
  /** Method to find a record in db using id and update it */
  update(obj, record) {
    return this.schema.findByIdAndUpdate(obj, record, { new: true });
  }
  /** Method to find a record in db using id and delete it */
  delete(obj) {
    return this.schema.findByIdAndDelete(obj);
  }
}

class StoreModel extends Model {
  constructor() {
    super(storeSchema);
  }
}

let storeModel= new StoreModel(storeSchema);

module.exports = storeModel;