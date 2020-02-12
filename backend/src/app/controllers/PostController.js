import * as Yup from 'yup';
import Post from '../schemas/Post';
import PostPG from '../models/Post';

class PostController {
  /**
   * Function that return a list of Posts.
   *
   * @param {req} n Request param
   * @param {res} n Response params
   * @return {Post} HTTP Status with an array of posts
   *
   * @example
   *
   *     index(req, res)
   */
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.status(200).json(posts);
  }

  /**
   * Function that return a list of Posts.
   *
   * @param {req} n Request param
   * @param {res} n Response params
   * @return {Post} HTTP Status with the created post, also emiting to the socket
   *
   * @example
   *
   *     store(req.postData, res)
   */
  async store(req, res) {
    /**
     * Verifica se o objeto enviado ao backend é válido
     */
    const schema = Yup.object().shape({
      author: Yup.string().required(),
      place: Yup.string().required(),
      description: Yup.string().required(),
      hashtags: Yup.string().required(),
    });

    /**
     * Caso não seja, retorna erro de validação de dados
     */
    if (!(await schema.isValid(req.body)) || !req.file) {
      return res.status(400).json({ error: 'Data validation failed' });
    }
    const { author, place, description, hashtags } = req.body;
    const { filename: image, mimetype: type } = req.file;

    /**
     * Verifica se o tipo da imagem é válido
     */
    if (type !== 'image/jpeg' && type !== 'image/png') {
      return res.status(403).json({ error: 'Image validation failed' });
    }

    /**
     * Cria o post e emite para o socket no frontend
     */

    try {
      const postgresStore = await PostPG.create({
        author,
        place,
        description,
        image,
        hashtags,
      });
    } catch (error) {
      console.log(error.message);
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

  /**
   * Function that return a list of Posts.
   *
   * @param {req} n Request param
   * @param {res} n Response params
   * @return {Number} ID of the deleted post, emiting to the frontend socket
   *
   * @example
   *
   *     delete(req.postID, res)
   */

  async delete(req, res) {
    await Post.findByIdAndRemove(req.headers.id);

    /**
     * emite ao frontend o post deletado, atualizando o feed
     */
    req.io.emit('delete', req.headers.id);
    return res.status(200).json({ ok: 'ok' });
  }
}
export default new PostController();
