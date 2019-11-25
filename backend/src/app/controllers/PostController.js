import * as Yup from 'yup';
import Post from '../schemas/Post';

class PostController {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.status(200).json(posts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      author: Yup.string().required(),
      place: Yup.string().required(),
      description: Yup.string().required(),
      hashtags: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)) || !req.file) {
      return res.status(400).json({ error: 'Data validation failed' });
    }
    const { author, place, description, hashtags } = req.body;
    const { filename: image, mimetype: type } = req.file;

    if (type !== 'image/jpeg' && type !== 'image/png') {
      return res.status(403).json({ error: 'Image validation failed' });
    }

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image,
    });

    req.io.emit('post', post);

    return res.status(200).json(post);
  }
}
export default new PostController();
