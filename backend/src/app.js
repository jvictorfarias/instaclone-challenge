import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import socketIO from 'socket.io';
import log from './app/middlewares/log';
import routes from './routes';

import './database';

/**
 * @var server - Variável que representa o servidor
 */
class App {
  constructor() {
    /** Utilização do Framework Express */
    this.server = express();
    /** Inicializando o Socket.io */
    this.io = socketIO();

    /**
     * Invocação dos métodos de init da aplicação
     */
    this.socket();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    /** Utilizando CORS para lidar com os requests HTTP */
    this.server.use(cors());
    /** Explicitando o uso de JSON pelo servidor */
    this.server.use(express.json());
    /** Chamando o componente responsável pelos logs */
    this.server.use(log('tiny'));
    /** Rota estática para envio de arquivos */
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'files'))
    );
  }

  routes() {
    /** Explicitando a utilização do arquivo de rotas da aplicação */
    this.server.use(routes);
  }

  socket() {
    /** Middleware Global para utilização do Socket.io */
    this.server.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }
}

export default new App();
