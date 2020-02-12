import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import api from '../../services/api';
import 'animate.css';

import Logo from '../../assets/logo.svg';
import './Registration.css';

export default function Registration({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    /**
     * Promises que retornam o componente de notificação de erro ou sucesso
     */
    api
      .post('registration', { name, email, password })
      .then(() => {
        history.push('/feed');
      })
      .catch(err => {
        if (err.response.status === 403) {
          store.addNotification({
            title: 'Erro!',
            message: 'Formato inválido.',
            type: 'danger',
            container: 'bottom-center',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            width: 400,
            dismiss: {
              duration: 3000,
            },
          });
        } else if (err.response.status === 401) {
          store.addNotification({
            title: 'Erro!',
            message: 'Já existe um usuário com esse email.',
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

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="Instaclone" />
        <input
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Digite o seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite a senha(min 8)"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
