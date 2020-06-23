const uuid = require('uuid').v4;
const io = require('socket.io-client');
const inquirer = require('inquirer');

let name = uuid();
const socket = io.connect('http://localhost:3000');
socket.userid = uuid();
socket.on('connect', () => {
  socket.emit('admin', name);

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
});

async function getInput() {
  const response = await inquirer.prompt([
    {
      prefix: '',
      name: 'text',
      message: `----------------\n`,
    },
  ]);
  socket.emit('message', `${response.text}`);
  getInput();
}
/// السروات
