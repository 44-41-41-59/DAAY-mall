'use strict';


require('@code-fellows/supergoose');

const {order}= require('../../src/DB/collection-model');

const orderObj = {status:'waiting'};
const editedorderObj = {status:'delivered'};


describe('Order Model', () => {
  it('create method', () => {
    return order.create(orderObj).then((result) => {
      Object.keys(orderObj).forEach((key) => {
        expect(result[key]).toEqual(orderObj[key]);
      });
    });
  });

  it('get method', () => {
    return order.read().then((result) => {
      Object.keys(orderObj).forEach((key) => {
        expect(result[0][key]).toEqual(orderObj[key]);
      });
    });
  });

  it('put method', () => {
    return order.read().then((result) => {
      const id = result[0]._id;
      return order.update(id,editedorderObj).then((result) => {
        Object.keys(editedorderObj).forEach((key) => {
          expect(result[key]).toEqual(editedorderObj[key]);
        });
      });
    });
  });

  it('delete method', () => {
    return order.read().then((result) => {
      const id = result[0]._id;
      return order.delete(id).then((result) => {
        return order.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});
