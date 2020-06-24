'use strict';

require('@code-fellows/supergoose');


const {cart}=require('../../src/DB/collection-model');


const cartObj = { userID: '5eee3d8344a2be451c171953', products:'5eee3e7c44a2be451c171956',quantity:2 };
const editedcartObj =  { userID: '5eee3d8344a2be451c171952', products:'5eee3e7c44a2be451c171955',quantity:1};

describe('Cart Model', () => {
  it('create method', () => {
    return cart.create(cartObj).then((result) => {
      Object.keys(cartObj).forEach((key) => {
        expect(JSON.stringify(result[key])).toEqual(JSON.stringify((cartObj[key])));
      });
    });
  });

  it('get method', () => {
    return cart.read().then((result) => {
      Object.keys(cartObj).forEach((key) => {
        expect(JSON.stringify(result[0][key])).toEqual(JSON.stringify((cartObj[key])));
      });
    });
  });

  it('put method', () => {
    return cart.read().then((result) => {
      const id = result[0]._id;
      return cart.update(id,editedcartObj).then((result) => {
        Object.keys(editedcartObj).forEach((key) => {
          expect(JSON.stringify(result[key])).toEqual(JSON.stringify((editedcartObj[key])));
        });
      });
    });
  });

  it('delete method', () => {
    return cart.read().then((result) => {
      const id = result[0]._id;
      return cart.delete(id).then((result) => {
        return cart.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});