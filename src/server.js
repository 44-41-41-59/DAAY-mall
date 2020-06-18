'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
const auth = require('./routes/auth/routes/routes.js');
const seedRoles = require('./routes/seedRoles/routes/routes.js');
const productsRoute = require('./routes/products/routes');
const storeRoutes = require('./routes/store/routes.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));

// sign in - sign up route
app.use('/auth', auth);
// used to seed the roles into the database one time
app.use('/seedroles', seedRoles);
// products routes
app.use(productsRoute);
// stores routes
app.use(storeRoutes);


app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Hearing from port -> ${port}`));
  },
};
