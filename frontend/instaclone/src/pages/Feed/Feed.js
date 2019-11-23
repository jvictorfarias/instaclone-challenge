import React, { Component } from 'react';
import api from '../../services/api';

import './Feed.css';

import more from '../../assets/more.svg';
import Like from '../../assets/like.svg';
import Comment from '../../assets/comment.svg';
import Send from '../../assets/send.svg';
import Header from '../../components/Header';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    const response = await api.get('posts');
    this.setState({ feed: response.data });
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  handleComment = id => {};

  render() {
    return (
      <div>
        <Header />

        <section id="post-list">
          {' '}
          {this.state.feed.map(post => (
            // Adicionar chave única no primeiro elemento
            <article key={post._id}>
              <header>
                <div className="user-info">
                  <span>{post.author}</span>
                  <span className="place">{post.place} </span>
                </div>
                <img src={more} alt="Mais" />
              </header>
              <img
                src={`http://localhost:3333/files/${post.image}`}
                alt="nothing"
              />
              <footer>
                <div className="actions">
                  <button
                    type="button"
                    onClick={() => this.handleLike(post._id)}
                  >
                    <img src={Like} alt="like" />
                  </button>
                  <button type="button" onClick={this.handleComment}>
                    <img src={Comment} alt="comment" />
                  </button>

                  <img src={Send} alt="send" />
                </div>

                <strong> {post.likes} </strong>
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
}

export default Feed;
