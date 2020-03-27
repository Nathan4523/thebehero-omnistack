/**
 * Onde ficará todas as rotas
 */
const express = require('express');

//importando os controller
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * req recebe as informacoes
 * res envia toda resposta da requisicao
 * 
 * Methods para serem usar
 * GET, POST, PUT, DELETE
 * 
 * req.query = Acessar query params (para filtros)
 * req.params = Acessar route params (para edição, delete)
 * req.body = Acessar corpo da requisição (para criação, edição)
 */

routes.post('/session', SessionController.create);

/**
 * Ongs
 */
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store);

/**
 * Incidents
 */
routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);


/**
 * Profile
 */
routes.get('/profile', ProfileController.index);

module.exports = routes;