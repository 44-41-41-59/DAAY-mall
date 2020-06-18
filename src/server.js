'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
const auth = require('./routes/auth/routes/routes.js');
const admin = require('./routes/admins/routes/routes.js');
const product = require('./routes/proudct/router');

// facebook rout
// const facebookRoute = require('./facebookServer/facebook-server.js');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/products', product);

// app.use(facebookRoute);

app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Hearing from port -> ${port}`));
  },
};
