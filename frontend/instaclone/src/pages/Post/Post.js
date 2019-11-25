import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import api from '../../services/api';

import './Post.css';
import 'animate.css';
import Header from '../../components/Header';

export default function Post({ history }) {
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // const { name } = await api.get('users/1');
    // setAuthor(name);
    const data = new FormData();

    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);
    data.append('image', image);

    api
      .post('posts', data)
      .then(() => {
        store.addNotification({
          title: 'Sucesso',
          message: 'Post Criado',
          type: 'success',
          container: 'bottom-center',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          width: 400,
          dismiss: {
            duration: 3000,
          },
        });
        history.push('/feed');
      })
      .catch(err => {
        if (err.response.status === 400) {
          store.addNotification({
            title: 'Erro!',
            message: 'Faltam dados a serem preenchidos.',
            type: 'danger',
            container: 'bottom-center',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            width: 400,
            dismiss: {
              duration: 3000,
            },
          });
        } else if (err.response.status === 403) {
          store.addNotification({
            title: 'Erro!',
            message: 'Formato inválido de imagem.',
            type: 'danger',
            container: 'bottom-center',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            width: 400,
            dismiss: {
              duration: 3000,
            },
          });
        }
      });
  }

  async function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <Header />
      <form id="new-post" onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          onChange={e => setAuthor(e.target.value)}
          value={author}
        />
        <input
          type="text"
          name="place"
          placeholder="Local da imagem"
          onChange={e => setPlace(e.target.value)}
          value={place}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags"
          onChange={e => setHashtags(e.target.value)}
          value={hashtags}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
