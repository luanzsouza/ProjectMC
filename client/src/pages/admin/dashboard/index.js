import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'
import  {getNomeUsuario} from '../../../services/auth'
import {getTipoUsuario} from '../../../services/auth';
import DashAdmin from './admin'
import DashGerente from './gerente'
import DashFuncionario from './funcionario'
import CloudIcon from '@mui/icons-material/Cloud';




const AppBar = styled(MuiAppBar, {
 shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
   
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));





const mdTheme = createTheme();
function getDashboard(){
  if(getTipoUsuario()==='1'){
    return <DashAdmin/>
  }else if(getTipoUsuario()==='2'){
    return <DashGerente/>
  }else{
    return <DashFuncionario/>
  }
}
function DashboardContent() {
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
       <AppBar position="absolute" >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              //onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
              //  ...(open && { display: 'none' }),
              }}
            >
               <Grid >
              <CloudIcon/>
              </Grid>
              
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            {getNomeUsuario()}
          </Toolbar>
        </AppBar>
        <MenuAdmin/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {getDashboard()}
                                   
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

