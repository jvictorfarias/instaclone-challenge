import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import socketIO from 'socket.io';
import log from './app/middlewares/log';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.io = socketIO();
    this.socket();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(log('tiny'));
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'files'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  socket() {
    this.server.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }
}

export default new App();
