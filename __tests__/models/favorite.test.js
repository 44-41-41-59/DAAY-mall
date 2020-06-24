'use strict';

require('@code-fellows/supergoose');


const {favorite}=require('../../src/DB/collection-model');

const favoriteObj = { userID: '5eee3d8344a2be451c171953', stores:'5eee3e7c44a2be451c171956' };
const editedFavoriteObj =  { userID: '5eee3d8344a2be451c171952', stores:'5eee3e7c44a2be451c171955'};


describe('Favorite Model', () => {
  it('create method', () => {
    return favorite.create(favoriteObj).then((result) => {
      Object.keys(favoriteObj).forEach((key) => {
        expect(JSON.stringify(result[key])).toEqual(JSON.stringify(favoriteObj[key]));
      });
    });
  });

  it('get method', () => {
    return favorite.read().then((result) => {
      Object.keys(favoriteObj).forEach((key) => {
        expect(JSON.stringify(result[0][key])).toEqual(JSON.stringify(favoriteObj[key]));
      });
    });
  });

  it('put method', () => {
    return favorite.read().then((result) => {
      const id = result[0]._id;
      return favorite.update(id,editedFavoriteObj).then((result) => {
        Object.keys(editedFavoriteObj).forEach((key) => {
          expect(JSON.stringify(result[key])).toEqual(JSON.stringify((editedFavoriteObj[key])));
        });
      });
    });
  });

  it('delete method', () => {
    return favorite.read().then((result) => {
      const id = result[0]._id;
      return favorite.delete(id).then((result) => {
        return favorite.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});