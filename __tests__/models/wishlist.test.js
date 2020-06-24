'use strict';

require('@code-fellows/supergoose');


const {wishlist} = require('../../src/DB/collection-model');

const wishlistObj = { userID: '5eee3d8344a2be451c171953', productID:'5eee3e7c44a2be451c171956'};
const editedwishlistObj =  { userID: '5eee3d8344a2be451c171952', productID:'5eee3e7c44a2be451c171955'};

describe('Wishlist Model', () => {
  it('create method', () => {
    return wishlist.create(wishlistObj).then((result) => {
      expect(JSON.stringify(result.userID)).toEqual(JSON.stringify((wishlistObj.userID)));
    });
  });

  it('get method', () => {
    return wishlist.read().then((result) => {
      Object.keys(wishlistObj).forEach((key) => {
        expect(JSON.stringify(result[key])).toEqual(JSON.stringify((wishlist[key])));

      });
    });
  });

  it('put method', () => {
    return wishlist.read().then((result) => {
      const id = result[0]._id;
      return wishlist.update(id,editedwishlistObj).then((result) => {
        Object.keys(editedwishlistObj).forEach((key) => {
          expect(JSON.stringify(result[key])).toEqual(JSON.stringify(editedwishlistObj[key]));
        });
      });
    });
  });

  it('delete method', () => {
    return wishlist.read().then((result) => {
      const id = result[0]._id;
      return wishlist.delete(id).then((result) => {
        return wishlist.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});
