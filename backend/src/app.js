import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import log from './app/middlewares/log';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(log('tiny'));
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'files'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
