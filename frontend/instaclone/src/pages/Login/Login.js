import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import api from '../../services/api';
import 'animate.css';

import Logo from '../../assets/logo.svg';
import './Login.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleCadastro() {
    history.push('/registration');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    api
      .post('login', { email, password })
      .then(response => {
        history.push(`/feed/${response.data.id}`);
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
        } else if (err.response.status === 400) {
          store.addNotification({
            title: 'Erro!',
            message: 'Usuário não existe.',
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
            message: 'Senha incorreta.',
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
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="Instaclone" />
        <input
          placeholder="Digite o email do seu Instaclone"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite a senha do seu Instaclone"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        <button type="button" onClick={handleCadastro}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}
