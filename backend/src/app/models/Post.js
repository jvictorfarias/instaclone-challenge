import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        author: Sequelize.STRING,
        description: Sequelize.TEXT,
        hashtags: Sequelize.TEXT,
        image: Sequelize.STRING,
        place: Sequelize.TEXT,
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize, // Precisa ser passado como objeto do que a tabela usuário pode receber para o INIT
      }
    );

    return this;
  }
}

export default Post;
