import React, { Component } from "react";

import api from "../../services/api";

import "./Post.css";
import Header from "../../components/Header";

class Post extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);
    data.append("image", this.state.image);

    await api.post("posts", data);

    this.props.history.push("/feed");
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Header />
        <form id="new-post" onSubmit={this.handleSubmit}>
          <input type="file" name="image" onChange={this.handleImageChange} />
          <input
            type="text"
            name="author"
            placeholder="Autor do post"
            onChange={this.handleChange}
            value={this.state.author}
          />
          <input
            type="text"
            name="place"
            placeholder="Local da imagem"
            onChange={this.handleChange}
            value={this.state.place}
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <input
            type="text"
            name="hashtags"
            placeholder="Hashtags"
            onChange={this.handleChange}
            value={this.state.hashtags}
          />

          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default Post;
