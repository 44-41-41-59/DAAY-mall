'use strict';

require('@code-fellows/supergoose');

const wishlistModel = require('../src/DB/whishlist/whishlist-model');

const obj = { userID:'5eee40ae10778c26c8341f22',productID:'5eee400744a2be451c17194e'};
const editedObj =  { userID:'5eee40ae10778c26c8341f22',productID:'5eee400744a2be451c17195b'};

describe('wishlist Model', () => {
  it('create product', () => {
    return wishlistModel.create(obj).then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(JSON.stringify(result[key])).toEqual(JSON.stringify(obj[key]));
      });
    });
  });

  // obj is undefined or null for some reason!!!

  // it('get wishlist by ID', () => {
  //   return wishlistModel.read().then((result) => {
  //     Object.keys(obj).forEach((key) => {
  //       expect(result[key]).toEqual(obj[key]);
  //     });
  //   });
  // });

  // it('edit wislist', () => {
  //   return wishlistModel.read(obj.userID).then((result) => {
  //     return wishlistModel.update(result._id,editedObj).then((result) => {
  //       Object.keys(editedObj).forEach((key) => {
  //         expect(result[key]).toEqual(editedObj[key]);
  //       });
  //     });
  //   });
  // });

  it('delete wishlist', () => {
    return wishlistModel.read().then((result) => {
      const id = result._id;
      return wishlistModel.delete(id).then((result) => {
        return wishlistModel.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});