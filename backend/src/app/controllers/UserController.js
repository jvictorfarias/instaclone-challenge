import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(403).json({ error: 'Data not valid' });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(401).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(403).json({ error: 'bad request' });
    }
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(req.body.password))) {
      return res.status(401).json({ error: 'Password invalid ' });
    }

    return res.status(200).json(user);
  }

  async index(req, res) {
    const { name, email } = await User.findByPk(req.params.id);

    return res.status(200).json({
      name,
      email,
    });
  }
}

export default new UserController();
