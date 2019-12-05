import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import PostPG from '../app/models/Post';

const models = [User, PostPG];

/**
 * Classe de inicialização dos bancos de dados
 */
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  /**
   * Inicia a conexão com o PostgreSQL, além de incializar os Models
   */
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }

  /**
   * Conexão com o MongoDB
   */
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}

export default new Database();
