'use strict';

require('@code-fellows/supergoose');

const {payment} = require('../../src/DB/collection-model');

const paymentObj = { userID: '5eee3d8344a2be451c171953', productID:['5eee3e7c44a2be451c171956'],cost:123};
const editedpaymentObj =  { userID: '5eee3d8344a2be451c171952', productID:['5eee3e7c44a2be451c171955'],cost:123};

describe('Payment Model', () => {
  it('create method', () => {
    return payment.create(paymentObj).then((result) => {
      Object.keys(paymentObj).forEach((key) => {
        expect(JSON.stringify(result[key])).toEqual((JSON.stringify(paymentObj[key])));
      });
    });
  });

  it('get method', () => {
    return payment.read().then((result) => {        
    //   Object.keys(paymentObj).forEach((key) => {
      expect(JSON.stringify(result[0].userID)).toEqual((JSON.stringify(paymentObj.userID)));
    //   });
    });
  });

  it('put method', () => {
    return payment.read().then((result) => {
      const id = result[0]._id;
      return payment.update(id,editedpaymentObj).then((result) => {
        expect(JSON.stringify(result.userID)).toEqual(JSON.stringify((editedpaymentObj.userID)));
      });
    });
  });

  it('delete method', () => {
    return payment.read().then((result) => {
      const id = result[0]._id;
      return payment.delete(id).then((result) => {
        return payment.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});