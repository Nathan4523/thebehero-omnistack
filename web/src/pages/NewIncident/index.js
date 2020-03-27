import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import api from '../../services/api';

//importando imagem
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push('/profile')
        } catch (err) {
            alert("Não foi possivel cadastrar um caso")
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Heroes" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" /> voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

