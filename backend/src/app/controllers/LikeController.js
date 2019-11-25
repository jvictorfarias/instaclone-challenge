import Post from '../schemas/Post';

class LikeController {
  /**
   * Function that stores post likes.
   *
   * @param {req} n Request param
   * @param {res} n Response params
   * @return {Post} HTTP Status with the post and emit "like" action
   *
   * @example
   *
   *     store(req.params.id)
   */
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    /**
     * Adiciona ao contador de likes
     */
    post.likes += 1;

    await post.save();

    /**
     * Emite ao socket do frontend, para atualizar o contador de likes
     */
    req.io.emit('like', post);
    return res.status(200).json(post);
  }
}

export default new LikeController();
