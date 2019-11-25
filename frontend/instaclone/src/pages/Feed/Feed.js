import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import config from '../../config/config';
import api from '../../services/api';
import './Feed.css';

import more from '../../assets/more.svg';
import Like from '../../assets/like.svg';
import Comment from '../../assets/comment.svg';
import Send from '../../assets/send.svg';
import Header from '../../components/Header';

export default function Feed({ history, match, location }) {
  const [posts, setPosts] = useState([]);
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
  }, [posts, socket]);

  async function pushLike() {
    socket.on('like', newLikedPost => {
      setPosts(
        posts.map(post => (post._id === newLikedPost._id ? newLikedPost : post)),
      );
    });
  }

  async function handleLike(e) {
    await api.post(`/posts/${e}/like`);
    pushLike();
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
              <img src={more} alt="Mais" />
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
                  <form>
                    <textarea
                      aria-label="Adicione um comentário..."
                      placeholder="Adicione um comentário..."
                      autoComplete="off"
                      autoCorrect="off"
                    />
                    <button type="submit">Publicar</button>
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
