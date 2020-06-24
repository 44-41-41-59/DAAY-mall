'use strict';

require('@code-fellows/supergoose');

const {product} = require('../../src/DB/collection-model');
// const { pay } = require('../src/routes/handlers');

const obj = { name: 'creams', price:'#', storeID: '1b2c' };
const editedObj =  { name: 'creams', price:'*' };

describe('Product Model', () => {
  it('create method', () => {
    return product.create(obj).then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[key]).toEqual(obj[key]);
      });
    });
  });

  it('get method', () => {
    return product.read().then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[0][key]).toEqual(obj[key]);
      });
    });
  });

  it('put method', () => {
    return product.read().then((result) => {
      const id = result[0]._id;
      return product.update(id,editedObj).then((result) => {
        Object.keys(editedObj).forEach((key) => {
          expect(result[key]).toEqual(editedObj[key]);
        });
      });
    });
  });

  it('delete method', () => {
    return product.read().then((result) => {
      const id = result[0]._id;
      return product.delete(id).then((result) => {
        return product.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});

