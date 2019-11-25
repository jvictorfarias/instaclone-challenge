import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { confirmAlert } from 'react-confirm-alert';
import config from '../../config/config';
import api from '../../services/api';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Feed.css';

import more from '../../assets/more.svg';
import Like from '../../assets/like.svg';
import Comment from '../../assets/comment.svg';
import Send from '../../assets/send.svg';
import Header from '../../components/Header';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const socket = io(config.url);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts');
      setPosts(response.data);
    }

    loadPosts();
  }, [posts._id]);

  useEffect(() => {
    socket.on('post', newPost => {
      setPosts([newPost, ...posts]);
    });

    socket.on('delete', id => {
      setPosts(posts.filter(post => post._id !== id));
    });
  }, [posts, socket]);

  async function pushComment() {
    socket.on('comment', newCommentPost => {
      setPosts(
        posts.map(post =>
          post._id === newCommentPost._id ? newCommentPost : post
        )
      );
    });
  }
  async function pushLike() {
    socket.on('like', newLikedPost => {
      setPosts(
        posts.map(post => (post._id === newLikedPost._id ? newLikedPost : post))
      );
    });
  }

  async function removePost(e) {
    confirmAlert({
      title: 'Deseja excluir o post?',
      message: 'Confirme a ação.',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await api.delete('/posts', {
              headers: {
                id: e,
              },
            });
          },
        },
        {
          label: 'Não',
        },
      ],
    });
  }

  async function handleLike(e) {
    pushLike();
    await api.post(`/posts/${e}/like`);
  }

  async function handleComment(e) {
    pushComment();
    await api.post(`/posts/${e}/comments`, { comments });
    setComments([]);
  }
  return (
    <div>
      <Header />

      <section id="post-list">
        {posts.map(post => (
          // Adicionar chave única no primeiro elemento
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <button type="button" onClick={() => removePost(post._id)}>
                <img src={more} alt="delete" />
              </button>
            </header>
            <img src={`${config.url}/files/${post.image}`} alt="nothing" />
            <footer>
              <div className="actions">
                <button type="button" onClick={() => handleLike(post._id)}>
                  <img src={Like} alt="like" />
                </button>
                <button type="button">
                  <img src={Comment} alt="comment" />
                </button>

                <img src={Send} alt="send" />
              </div>

              <strong>{post.likes}</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
            <footer>
              <section id="comment">
                <div>
                  <ul>
                    {post.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                  <form>
                    <textarea
                      aria-label="Adicione um comentário..."
                      placeholder="Adicione um comentário..."
                      autoComplete="off"
                      autoCorrect="off"
                      value={comments}
                      onChange={e => setComments(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleComment(post._id)}
                    >
                      Publicar
                    </button>
                  </form>
                </div>
              </section>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}
