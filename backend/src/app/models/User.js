import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
/** Classe representando um modelo de Usuário */
class User extends Model {
  /**
   * Cria um usuário no Model Sequelize.
   * @param {sequelize} n - Objeto User.
   * @param {name} n - Nome do usuário.
   * @param {password} n - Senha do Usuário.
   * @param { password_hash} n - Senha encriptada.
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    /**
     * Hook para encriptar a senha antes de salvá-la no banco de dados
     */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /**
   * Verifica se a senha enviada pelo usuário é de acordo com a senha encriptada
   * do banco de dados.
   * @param {string} password - Senha enviada
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
