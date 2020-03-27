import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

//importando imagem
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { useState } from 'react';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('/session', { id });
      
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')
    }catch(err){
      alert("Falha no login, tente novamente")
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Heroes" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Seu id" value={id} onChange={e => setId(e.target.value)} />
          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}
