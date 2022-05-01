const express= require('express');

const routes= express.Router();

const Usuario= require('./controllers/usuario.controllers');

routes.get('/',Usuario.index);
//rotas de usuarios
routes.post('/api/usuarios',Usuario.create);
routes.get('/api/usuarios.details/',Usuario.details);  
routes.get('/api/usuarios',Usuario.index);
  



module.exports = routes;