/**
 * Onde ficará todas as rotas
 */
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.store);

/**
 * Incidents
 */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index)
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.destroy);


/**
 * Profile
 */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

module.exports = routes;