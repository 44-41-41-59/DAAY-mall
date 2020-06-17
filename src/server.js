'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
// facebook route
const facebookRoute = require('./facebookServer/facebook-server.js');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
// app.use(express.static('./public'));
app.use('/', express.static('./public'));
app.use(facebookRoute);
// app.post('/addData',(req,res)=>{

// })
app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Hearing from port -> ${port}`));
  },
};
