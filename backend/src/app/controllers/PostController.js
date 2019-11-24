import Post from '../schemas/Post';

class PostController {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.status(200).json(posts);
  }

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

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
