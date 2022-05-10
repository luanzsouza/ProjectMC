import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import api from '../services/api'
import {getToken,logout} from '../services/auth'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component ="a" href="/admin">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component ="a" href="/admin/usuarios">
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios"  />
    </ListItemButton>
    <ListItemButton component ="a" href="/admin/produtos">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItemButton>
  
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
     Opções
    </ListSubheader>
    <ListItemButton onClick={confirmSair}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);
async function confirmSair(){
  if(window.confirm("deseja sair Realmente do sistema ?")){
    const response= await api.get("/api/usuarios/destroyToken",{headers:{token: getToken()}});
    if(response.status===200){
      logout();
      window.location.href='/admin/login'
    }else{
      alert("nao foi possivel efetuar o logout!");
    }
  }
}