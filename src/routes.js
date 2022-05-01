const express= require('express');

const routes= express.Router();

const Usuario= require('./controllers/usuario.controllers');

routes.get('/',Usuario.index);
routes.get('/api/usuarios',Usuario.create);
    



module.exports = routes;