import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../schemas/User';

class UserController {
  /**
   * Function that creates a User.
   *
   * @param {req} n Request param
   * @param {res} n Response params
   * @return {User} ID of the deleted post, emiting to the frontend socket
   *
   * @example
   *
   *     store(req.body.user, res)
   */

  async store(req, res) {
    /**
     * Validação do objeto User
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
    });

    /**
     * Caso seja inválido, retorna status de erro
     */

    if (!(await schema.isValid(req.body))) {
      return res.status(403).json({ error: 'Data not valid' });
    }

    /**
     * Verifica se já existe algum usuário com esse email
     */

    if (await User.findOne({ email: req.body.email })) {
      return res.status(401).json({ error: 'User already exists' });
    }

    /**
     * Cria o usuário
     */

    /** Encripta a senha do usuário  */
    req.body.password_hash = await bcrypt.hash(req.body.password, 8);

    const { id, name, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
  /**
   * Function that list a specific authenticated user.
   *
   * @param {req} n Request param
   * @param {res} n Response params
   * @return {User} Return the authenticated
   *
   * @example
   *
   *     show(req.userID, res)
   */

  async show(req, res) {
    /**
     * Verifica se o objeto para validação está correto
     */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
    });

    /**
     * Caso o objeto não seja válido, retorna status de erro
     */

    if (!(await schema.isValid(req.body))) {
      return res.status(403).json({ error: 'bad request' });
    }

    /**
     * Busca pelo usuário já validado
     */
    const user = await User.findOne({ email: req.body.email });

    /**
     * Caso o usuário não seja encontrado, retorna erro
     */
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    /**
     * Verifica se a senha do usuário está correta e encriptada
     */

    if (!(await bcrypt.compare(req.body.password, user.password_hash))) {
      return res.status(401).json({ error: 'Wrong password' });
    }
    /**
     * Retorna o usuário para que ele possa ser direcionado ao feed
     */
    const { id, name, email } = user;
    return res.status(200).json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
