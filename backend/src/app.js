/**
 * aqui vem a inicializacao do servidor
 */
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após *?* (filtros, paginação)
 * Route Params: Parâmetros utilizados apra identifiar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
  * Para forçar o uso em json
  */
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors())

module.exports = app
