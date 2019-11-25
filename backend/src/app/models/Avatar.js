import Sequelize, { Model } from 'sequelize';

/** Classe representando um modelo de avatar, não deu tempo de finalizar */
class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/avatars/${this.path}`;
          },
        },
      },
      {
        sequelize, // Precisa ser passado como objeto do que a tabela usuário pode receber para o INIT
      }
    );

    return this;
  }
}

export default Avatar;
