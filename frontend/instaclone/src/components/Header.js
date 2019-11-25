import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../assets/logo.svg';
import Camera from '../assets/camera.svg';
/**
 * Header do app, que contém a logo e o botão de post
 */
export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/feed">
          <img src={Logo} alt="InstaClone" />
        </Link>
        <Link to="/post">
          <img src={Camera} alt="CreatePost" />
        </Link>
      </div>
    </header>
  );
}
