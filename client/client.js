const uuid = require('uuid').v4;
const io = require('socket.io-client');
const inquirer = require('inquirer');

let name = uuid();
const socket = io.connect('http://localhost:3000');
socket.userid = uuid();
socket.on('connect', () => {
  let room = '';
  socket.emit('userConnected', name);
  socket.on('joinded', (currentRoom) => (room = currentRoom));
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', 'yazan', 'ahmed', (data) => {
      console.log(data);
    });
  });
  socket.emit('say', 'hello there');
  socket.on('my message', (msg) => {
    console.log(msg);
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
    console.log(command, 'mowe');
    switch (command) {
      case 'quit':
        socket.emit('userDisconnected', { room });
        process.exit();
        console.log('bsbs');
        break;
      default:
        activeInput = false;
        // socket.emit('message', `[${name}]: ${response.text}`);
        getInput();
        break;
    }
    // socket.emit('message', `${response.text}`);
    getInput();
  }
  /// السروات
});
