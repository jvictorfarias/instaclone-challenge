import React, { useState } from "react";
import api from "../../services/api";

import Logo from "../../assets/logo.svg";
import "./Login.css";

export default function Login({ history }) {
  const [username, setUsername, password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      username
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="Instaclone" />
        <input
          placeholder="Digite o email do seu Instaclone"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Digite a senha do seu Instaclone"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit"> Enviar </button>
      </form>
    </div>
  );
}
