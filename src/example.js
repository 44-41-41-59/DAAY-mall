const cartType = require('./cart-schema');
/**
 * Cart  Schema
 * @type {{type: Schema.Types.ObjectId,type: Schema.Types.ObjectId,type: Number}}
 */

const Cart ={
  userID: '3',
  products: '5',
  quantity:  3 ,
};

/**
 * Chat functions
 */

/**
* @type {param type} param name - description
*/

class cartModel {
  constructor(schema) {
    this.schema = schema;
  }

  async read(obj) {
    if (obj === undefined) {
      return await this.schema.find({});
    }
    // console.log(obj);
    return await this.schema.find(obj);
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  delete(obj) {
    return this.schema.deleteMany(obj);
  }
  test(userID) {
    return this.schema.find({ userID }).populate('products');
  }
}

module.exports = new cartModel(cartType);
