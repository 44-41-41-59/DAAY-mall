'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/errors/not-found.js');
const errorHandeler = require('./middlewares/errors/server-error.js');
const auth = require('./routes/auth/routes/routes.js');
const seedRoles = require('./routes/seedRoles/routes/routes.js');

const mainRouter = require('./routes/mainRoutes');

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

// mainRouter
app.use(mainRouter);

app.use('*', notFound);
app.use(errorHandeler);

module.exports = {
  server: app,
  start: (port) => {
    server.listen(port);
    // app.listen(port, () => console.log(`Hearing from port -> ${port}`));
  },
};
let clientsQueue = [];
let custmerRoom = {};
io.on('connection', (socket) => {
  socket.on('massege', (room, message, id) => {
    console.log(room);
    io.in(room).emit('masseage', { message, id });
  });

  socket.on('error', (payload) => {
    console.log('error', payload);
  });
  socket.on('admin', (name, room) => {
    custmerRoom[room] = { status: true, name };
    socket.join(room);
    console.log(custmerRoom);
    setTimeout(() => {
      loop();
    }, 1000);
  });
  socket.on('next', (room) => {
    if (custmerRoom[room]) custmerRoom[room].status = true;
    setTimeout(() => {
      loop();
    }, 1000);
  });
  socket.on('admindisconecct', (room) => {
    delete custmerRoom[room];
    console.log(custmerRoom);
  });
  socket.on('userConnected', async (name) => {
    clientsQueue.push(socket);

    if (!loop()) socket.emit('wait', {});
  });
  socket.on('userDisconnected', (room) => {
    socket.leave(room.room);
    // if (custmerRoom[room.room]) custmerRoom[room.room].status = true;
    // setTimeout(() => {
    //   loop();
    // }, 1000);
    // console.log(room, 'bsbsbs moew');
    io.in(room.room).emit('next', room.room);

    console.log(custmerRoom);
  });
});

function loop() {
  if (clientsQueue.length) {
    for (let room in custmerRoom) {
      if (custmerRoom[room].status) {
        let name = custmerRoom[room].name;
        let socket = clientsQueue.shift();
        socket.join(room);
        socket.emit('joinded', { room, name });
        custmerRoom[room].status = false;
        console.log('sreved', custmerRoom);
        return room;
      }
    }
    return false;
  }
}
