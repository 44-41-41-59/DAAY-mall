'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
const auth = require('./routes/auth/routes/routes.js');
const seedRoles = require('./routes/seedRoles/routes/routes.js');
const productsRoute = require('./routes/products/routes');
const reviewsRoute = require('./routes/reviews/router.js');
const storeRoutes = require('./routes/store/routes.js');
const favoriteRoutes = require('./routes/favorite/routes.js');
const cartRoutes = require('./routes/cart/routes.js');
const whishlistRoutes = require('./routes/whishlist/routes.js');
const pay = require('./routes/payment/routes.js');
const orderRoutes = require('./routes/store/orders/routes.js');
const paymentHistory = require('./routes/payment/payment-history/routes.js');
const uuid = require('uuid').v4;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// sign in - sign up route
app.use('/auth', auth);
// used to seed the roles into the database one time
app.use('/seedroles', seedRoles);
// products routes
app.use(productsRoute);
// reviews routes
app.use(reviewsRoute);
// stores routes
app.use(storeRoutes);
// favorite routes
app.use(favoriteRoutes);
// cart routes
app.use(cartRoutes);
// whishlist routes
app.use(whishlistRoutes);
app.use(pay);
// orders routes
app.use(orderRoutes);
// payment history routes
app.use(paymentHistory);

app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  server: app,
  start: (port) => {
    server.listen(port);
    // app.listen(port, () => console.log(`Hearing from port -> ${port}`));
  },
};
let arr = [];
let object = {};
let id;
io.on('connection', (socket) => {
  socket.on('error', (payload) => {
    console.log('error', payload);
  });
  let room;
  socket.on('admin', (name) => {
    let room = uuid();
    object[room] = true;
    console.log(name);
    socket.join(room);
    console.log(object);
  });
  socket.on('userConnected', async (name) => {
    arr.push(socket);
    loop();
    // let x = setInterval(() => {
    // room = loop();
    // console.log(userRoom, 'heeeeeellojkjjlkjlkjl');
    // if (userRoom) clearInterval(x);
    // }, 200);
    // let x = await loop();
    // userRoom = x;
    // console.log('bobo', userRoom);
    // console.log(name);
    // socket.join(name);
  });
  socket.on('userDisconnected', (room) => {
    socket.leave(room);
    console.log(room, 'bsbsbs moew');
    object[room] = true;
    loop();
    console.log(object);
  });
  // socket.on('message', (msg) => console.log(msg));
});

// function loop() {
//   let c2 = 0;
//   let c = 0;
//   console.log('loop', c++);
//   let break2 = true;
//   while (break2) {
//     console.log('q', c2++);
//     for (let room in object) {
//       if (object[room]) {
//         let socket = arr.shift();
//         socket.join(room);
//         object[room] = false;
//         console.log('sreved', object);
//         break2 = false;
//         return room;
//       }
//     }
//   }
function loop() {
  for (let room in object) {
    if (object[room]) {
      let socket = arr.shift();
      socket.join(room);
      socket.emit('joinded', room);
      object[room] = false;
      console.log('sreved', object);
      // break2 = false;
      return room;
    }
  }
  // return false;
  // setTimeout(() => loop(), 200);
}
// for (let room in object) {
//   if (object[room]) {
//     let socket = arr.shift();
//     socket.join(room);
//     object[room] = false;
//     console.log('sreved', object);
//     return object[room];
//   }
// }
// setTimeout(() => loop(), 200);
// }
