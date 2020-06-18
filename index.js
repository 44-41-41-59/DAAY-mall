'use strict';
require('dotenv');
const server = require('./src/server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/daay-mall';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.start(PORT);
