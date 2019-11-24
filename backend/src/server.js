import http from 'http';
import socket from 'socket.io';
import app from './app';

const server = http.createServer(app);

const io = socket(server);

io.on('connection', client => {
  client.on('event', data => {
    console.log(data);
  });
});

server.listen(process.env.PORT);
