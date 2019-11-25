import Post from '../schemas/Post';

class CommentController {
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.comments.push(req.body.comments);
    post.save();

    req.io.emit('comment', post);

    return res.status(200).json(post);
  }
}

export default new CommentController();
