const express= require('express');

const routes= express.Router();

const Usuario= require('./controllers/usuario.controllers');
const Produto= require('./controllers/produtos.controllers ');
routes.get('/',Usuario.index);
//rotas de usuarios
routes.post('/api/usuarios',Usuario.create);
routes.get('/api/usuarios.details/:_id',Usuario.details);  
routes.get('/api/usuarios',Usuario.index);
routes.delete('/api/usuarios.delete/:_id',Usuario.delete);
routes.put('/api/usuarios.update/',Usuario.updateusuario);

//rotas de produtos
routes.post('/api/produtos',Produto.create);
routes.get('/api/produtos.details/:_id',Produto.details);  
routes.get('/api/produtos',Produto.index);
routes.delete('/api/produtos.delete/:_id',Produto.delete);
routes.put('/api/produtos.update/',Produto.updateProduto);




module.exports = routes;