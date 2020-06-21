'use strict';

require('@code-fellows/supergoose');

const productsModel = require('../src/DB/product/product-model');

const obj = { name: 'creams', price:'#', storeID: '1b2c' };
const editedObj =  { name: 'creams', price:'*' };

describe('products Model', () => {
  it('create product', () => {
    return productsModel.create(obj).then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[key]).toEqual(obj[key]);
      });
    });
  });

  it('get product', () => {
    return productsModel.read().then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[0][key]).toEqual(obj[key]);
      });
    });
  });

  it('put product', () => {
    return productsModel.read().then((result) => {
      const id = result[0]._id;
      return productsModel.update(id,editedObj).then((result) => {
        Object.keys(editedObj).forEach((key) => {
          expect(result[key]).toEqual(editedObj[key]);
        });
      });
    });
  });

  it('delete product', () => {
    return productsModel.read().then((result) => {
      const id = result[0]._id;
      return productsModel.delete(id).then((result) => {
        return productsModel.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});