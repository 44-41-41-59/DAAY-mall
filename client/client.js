const uuid = require('uuid').v4;
const io = require('socket.io-client');
const inquirer = require('inquirer');

let name = uuid();
const socket = io.connect('http://localhost:3000');
socket.userid = uuid();
socket.on('connect', () => {
  let masseges = [];
  let room = '';
  socket.on('massege', (massege) => {
    console.log(massege, 'helo');
  });

  socket.on('wait', () => {
    console.log('\x1b[47m', 'please wait will be with u soon');
  });
  socket.emit('userConnected', name);
  socket.on('joinded', (currentRoom) => {
    room = currentRoom.room;
    console.log('\x1b[44m', 'hello u was served with ' + currentRoom.name);
  });
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', 'yazan', 'ahmed', (data) => {
      console.log(data);
    });
  });
  socket.emit('say', 'hello there');
  socket.on('masseage', (massege) => {
    console.clear();
    masseges.push(massege);
    masseges.forEach((massege) => {
      massege.id === socket.id
        ? console.log(' ' + massege.message)
        : console.log(
            '\x1b[33m%s\x1b[0m',
            '                                                   ' +
              massege.message
          );
    });
    console.log('');
  });

  getInput();

  async function getInput() {
    const response = await inquirer.prompt([
      {
        prefix: '',
        name: 'text',
        message: `----------------\n`,
      },
    ]);
    const command = response.text.toLowerCase().split(' ')[0];
    switch (command) {
      case 'quit':
        socket.emit('userDisconnected', { room });
        process.exit();
        break;
        s;
      default:
        socket.emit('massege', room, response.text, socket.id);
        getInput();
        break;
    }
    // socket.emit('message', `${response.text}`);
    // getInput();
  }
  /// السروات
});
