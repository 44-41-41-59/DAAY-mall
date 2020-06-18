'use strict';
const { Schema, model } = require('mongoose');

const Role = Schema({
  role: { type: String, required: true, enum: ['user', 'admin', 'owner'] },
  capabilities: { type: Array, required: true },
});

module.exports = model('role', Role);
