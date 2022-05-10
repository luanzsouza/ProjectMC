import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../../services/api'
import {setNomeUsuario,setIdUsuario,login,setTipoUsuario} from '../../../services/auth';
import CircularProgress from '@mui/material/CircularProgress';


function Copyright(props) {
  return (
    
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        CrudMC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
    const [email,setEmail]= useState('');
    const [senha,setSenha]= useState('');
    const [loading,setLoading]=useState(false);
    async function handleSubmit(){
     
      await api.post('/api/usuarios/login',{email,senha})
      
      .then(res =>{
        console.log( 'cheguei na verificação do login')
         if(res.status===200){
            if(res.data.status===1){
              login(res.data.token);
              setIdUsuario(res.data.id_client);
              setNomeUsuario(res.data.user_name);
              setTipoUsuario(res.data.user_type);

              window.location.href='/admin';
            }else if (res.data.status===2){
              alert('Atenção: '+res.data.error);

            }
            setLoading(false);
         }else{
            alert('errro no servidor');
            setLoading(false);

         }  
      })
    }
    function loadSubmit(){
      setLoading(true);
      setTimeout(
        ()=>handleSubmit(),2000
      )
    }
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Digite seu email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange ={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Digite sua senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                value={senha}
                onChange ={e => setSenha(e.target.value)}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loadSubmit}
                disable={loading}
              >
                {loading?<CircularProgress />:"Entrar"}
               
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}