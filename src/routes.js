const express= require('express');

const routes= express.Router();

const Usuario= require('./controllers/usuario.controllers');

routes.get('/',Usuario.index);
//rotas de usuarios
routes.post('/api/usuarios',Usuario.create);
routes.get('/api/usuarios.details/:_id',Usuario.details);  
routes.get('/api/usuarios',Usuario.index);
routes.delete('/api/usuarios.delete/:_id',Usuario.delete);
routes.put('/api/usuarios.update/',Usuario.updateusuario);
routes.post('/api/usuarios/login',Usuario.login);
routes.get('/api/usuarios/checktoken',Usuario.checktoken);
routes.get('/api/usuarios/destroyToken',Usuario.destroyToken);

module.exports = routes;