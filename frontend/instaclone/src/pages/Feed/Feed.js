import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './Feed.css';

import more from '../../assets/more.svg';
import Like from '../../assets/like.svg';
import Comment from '../../assets/comment.svg';
import Send from '../../assets/send.svg';
import Header from '../../components/Header';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts');
      setPosts(response.data);
    }
    loadPosts();
  });

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
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt="nothing"
            />
            <footer>
              <div className="actions">
                <button type="button">
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
          </article>
        ))}
      </section>
    </div>
  );
}
