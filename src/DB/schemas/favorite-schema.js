'use strict';
const { Schema, model } = require('mongoose');

const FavoriteStore = new Schema({
  userID: { type: Schema.Types.ObjectId },
  stores: { type: Schema.Types.ObjectId, ref: 'store' },
});

// FavoriteStore.virtual('store', {
//   ref: 'store',
//   localField: 'store_id',
//   foreignField: 'storeID',
// });
module.exports = model('favoriteStore', FavoriteStore);
