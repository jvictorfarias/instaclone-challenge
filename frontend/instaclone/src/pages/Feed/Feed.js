import React, { Component } from "react";
import api from "../../services/api";

import "./Feed.css";

import more from "../../assets/more.svg";
import Like from "../../assets/like.svg";
import Comment from "../../assets/comment.svg";
import Send from "../../assets/send.svg";

class Feed extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    const response = await api.get("posts");
    this.setState({ feed: response.data });
  }

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(post => (
          <article>
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
                <img src={Like} alt="like" />
                <img src={Comment} alt="comment" />
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
    );
  }
}

export default Feed;
