import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom'  ;

//imports admin
import Dashboard from './pages/admin/dashboard/index';
import Login from './pages/admin/login/index';
import Produtos from './pages/admin/produtos/index';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';

import Usuarios from './pages/admin/usuarios/index';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

//imports client
import Home from './pages/client/home/index'
import ProdutoDetails from './pages/client/produtos/produtos.details'
//o de baixo esta dando erro
//import PrivateRoute from './services/wAuth'

export default function Rotas(){
    console.log('cheguei no rotas');
    return(
        <BrowserRouter>
            <Routes>
                    {/*Rotas cliente */}
                    <Route path="/"exact element={<Home />}/>
                    <Route path="/produtos/:idProduto" exact element={<ProdutoDetails/>}/>
                    {/*Rotas Admin */}
                    <Route path="/admin" exact element={<Dashboard/>}/>
                    <Route path="/admin/login" exact element={<Login/>}/>
                    <Route path="/admin/produtos" exact element={<Produtos/>}/>
                    <Route path="/admin/produtos/cadastrar" exact element={<ProdutoCadastrar/>}/>
                    <Route path="/admin/produtos/editar/:idProduto" exact element={<ProdutoEditar/>}/>
                    <Route path="/admin/usuarios" exact element={<Usuarios/>}/>
                    <Route path="/admin/usuarios/cadastrar" exact element={<UsuarioCadastrar/>}/>
                    <Route path="/admin/usuarios/editar/:idUsuario" exact element={<UsuarioEditar/>}/>
            </Routes>

        </BrowserRouter>

);
}