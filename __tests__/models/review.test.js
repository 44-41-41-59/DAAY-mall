'use strict';

require('@code-fellows/supergoose');


const {review} = require('../../src/DB/collection-model');


const reviewObj = { userID: '5eee3d8344a2be451c171953', review:'Excellent',rate:5 ,storeID:'5eee3e7c44a2be451c171956',productID:'5ef1d15e79a03b30983223c4'};
const editedreviewObj =  { userID: '5eee3d8344a2be451c171953', review:'Excellent',rate:5 ,storeID:'5eee3e7c44a2be451c171956',productID:'5eee3fd844a2be451c171959'};

describe('Review Model', () => {
  it('create method', () => {
    return review.create(reviewObj).then((result) => {
      Object.keys(reviewObj).forEach((key) => {
        expect(result[key]).toEqual(reviewObj[key]);
      });
    });
  });

  it('get method', () => {
    return review.read().then((result) => {
      Object.keys(reviewObj).forEach((key) => {
        expect(result[0][key]).toEqual(reviewObj[key]);
      });
    });
  });

  it('put method', () => {
    return review.read().then((result) => {
      const id = result[0]._id;
      return review.update(id,editedreviewObj).then((result) => {
        Object.keys(editedreviewObj).forEach((key) => {
          expect(result[key]).toEqual(editedreviewObj[key]);
        });
      });
    });
  });

  it('delete method', () => {
    return review.read().then((result) => {
      const id = result[0]._id;
      return review.delete(id).then((result) => {
        return review.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});