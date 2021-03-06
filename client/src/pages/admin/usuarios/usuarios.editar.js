import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import api from '../../../services/api';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import  {getNomeUsuario} from '../../../services/auth'
import CloudIcon from '@mui/icons-material/Cloud';


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const mdTheme = createTheme();


export default function UsuariosEditar() {
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [tipo,setTipo] = useState('');
  const { idUsuario } = useParams();
  useEffect (  ()  =>  {
    async function getUsuario(){
        const response = await api.get('/api/usuarios.details/'+idUsuario);
        setNome(response.data.nome_usuario);
        setEmail(response.data.email_usuario);
        setSenha(response.data.senha_usuario);
        setTipo(response.data.tipo_usuario);
    }
    getUsuario();
        
  },[])
 
  async function handleSubmit(){
      const data={nome_usuario:nome, 
                  email_usuario:email,
                  senha_usuario:senha,
                  tipo_usuario:tipo,
                  _id:idUsuario}
        if(nome!==''&& email!==''&& senha!==''&&tipo!==''&&idUsuario!==''){
          const response = await api.put('/api/usuarios.update/',data); 

          if(response.status===200){
            window.location.href='/admin/usuarios'
    
          }else{
            alert('erro ao editar o usu??rio!');
          }
        }else{
          alert('preencha todos os dados');

        }
                  
     
  }

 

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              //onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                //  ...(open && { display: 'none' }),
              }}
            >
              <CloudIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Atualizar usuario
            </Typography>
            {getNomeUsuario()}
          </Toolbar>
        </AppBar>
        <MenuAdmin />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item sm={12}>
            <Button color="primary" variant="contained" href={'/admin/usuarios/'}><ArrowBackIcon/>Voltar</Button>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={12}>
                  <h2>Atualiza????o de usuarios</h2>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome"
                      variant="standard"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      
                    />
                    
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      //autoComplete="email"
                      variant="standard"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
          labelId="tipo"
          id="tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          autoWidth
          label="Tipo"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Administrador</MenuItem>
          <MenuItem value={2}>Gerente</MenuItem>
          <MenuItem value={3}>Funcionario</MenuItem>
      
        </Select>
      </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      type="password"
                      fullWidth
                      autoComplete="senha"
                      variant="standard"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
              
                
                  </Grid>
                </Grid>
                <Grid xs={6} sm={3}>
                <Button variant="contained" onClick={handleSubmit}><CheckIcon/>Salvar</Button>
                </Grid>
                

              </Paper>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    
  );

}
