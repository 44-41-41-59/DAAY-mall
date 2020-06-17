'use strict';
require('dotenv');
const server = require('./src/server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const MONOGODB_URI =
  process.env.MONOGODB_URI || 'mongodb://localhost:27017/daay-mall';
mongoose.connect(MONOGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.start(PORT);
