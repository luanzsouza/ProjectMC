import   React,{useState,useEffect} from 'react';
import Chip from '@mui/material/Chip';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import api from '../../../services/api';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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



export default function UsuariosListagem() {
  const [usuarios,setUsuarios]=useState([]);
  useEffect(()=>{
      async function loadUsuarios(){
        const response= await api.get("/api/usuarios")
        
        setUsuarios(response.data);

      }
      loadUsuarios();


  },[])
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
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Usuarios
            </Typography>
           
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
            <Grid container spacing={2}>
              <Grid item sm={12}>
            <Paper sx={{p: 2,display: "flex",flexDirection: "column",height: 500,}}>
              <h2>Listagem de usuarios</h2>
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size= "medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Data de cadastro</TableCell>
            <TableCell align="center">Opçoes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nome_usuario}
              </TableCell>
              <TableCell align="center">{row.email_usuario}</TableCell>
              <TableCell align="center">{row.tipo_usuario===10?<>
                <Chip color="primary" label="Administrador" />
                
                </>:<>
                <Chip color="secondary" label="Funcionario" /></>}</TableCell>
              <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
              <TableCell align="center">
              <ButtonGroup  aria-label="outlined  button group">
      <Button color="primary">Atualizar</Button>
      <Button color="secondary" >Excluir</Button>
     
    </ButtonGroup>

              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
          
              </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

