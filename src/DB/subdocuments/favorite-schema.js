'use strict';
const { Schema, model } = require('mongoose');
const story = require('../store/store-schema.js');

const FavoriteStore = new Schema({
  stores: [{ type: Schema.Types.ObjectId, ref: 'store' }],
});

module.exports = model('favoriteStore', FavoriteStore);
