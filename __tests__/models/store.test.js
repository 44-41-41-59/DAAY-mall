'use strict';

require('@code-fellows/supergoose');


const {store} = require('../../src/DB/collection-model');

const storeObj = { name: 'name', category:'general' ,country:'jordan',city:'amman',contactNumber:123,ownerID:'5eee3e2144a2be451c171955'};
const editedstoreObj =  { name: 'name', category:'food' ,country:'jordan',city:'amman',contactNumber:123,ownerID:'5eee3e2144a2be451c171955'};

describe('Store Model', () => {
  it('create method', () => {
    return store.create(storeObj).then((result) => {
      Object.keys(storeObj).forEach((key) => {
        expect(result[key]).toEqual(storeObj[key]);
      });
    });
  });

  it('get method', () => {
    return store.read().then((result) => {
      Object.keys(storeObj).forEach((key) => {
        expect(result[0][key]).toEqual(storeObj[key]);
      });
    });
  });

  it('put method', () => {
    return store.read().then((result) => {
      const id = result[0]._id;
      return store.update(id,editedstoreObj).then((result) => {
        Object.keys(editedstoreObj).forEach((key) => {
          expect(result[key]).toEqual(editedstoreObj[key]);
        });
      });
    });
  });

  it('delete method', () => {
    return store.read().then((result) => {
      const id = result[0]._id;
      return store.delete(id).then((result) => {
        return store.read().then((result2) => {
          expect(result2).toEqual([]);
        });
      });
    });
  });

});
