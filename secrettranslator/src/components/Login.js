import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//alert API
import swal from 'sweetalert';

/** Hooks */
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect} from 'react';

/** local imports */
import { loginApi} from './services/api';

import Image from "./login.png";


const initialValues={
  userName:"",
  password:"",
  
};

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate(); // initializing useNavigate for redirections
  const [user,setUser]=useState(initialValues);

  const {userName , password} = user;;
  const onValueChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log(e.target.value)
    console.log(user);
   }

   useEffect(()=>{
    
   },[])

   const handleSubmit=(e)=>{
    e.preventDefault(); //vvvvvvvvvvvvvvvvvvvvvviiiiiiiiiiiiiiiiiiiiiiimmmmmmmmmmmmmmmmmmmmmmmmmmm (very imp)
    if(userName==='' || password===''){
      swal("Error ! ", "Please enter username and password", "error");
    }
    else{
      loginApi(user).then((res)=>{
        const data=res.data
        if(data.msg==="success"){
          
          swal("Sucess " , "Successfully Logged In" , "success");
          navigate("/selector");
        }
        else{
          // alert("Invalid username or password!!");
          swal("Error ! ", "Invalid username or password!!", "error");
  
        }
      })
      // getUser().then((res)=>{
      //     const data=res.data;
      //     console.log(data.msg)
      // })
    }
    
   }

  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const styles = {
    gridContainer: {
      width: "100%",
      backgroundImage: `url(${Image})`,
      height: "100vh",
      backgroundSize: "cover",
      backgroundRepeat : "no-repeat"
    }
  };


  return (

    
    <Grid container style={styles.gridContainer}>

    <ThemeProvider theme={theme}>
      <img />
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="userName"
              autoComplete="off"
              autoFocus
              onChange={(e)=>onValueChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
              onChange={(e)=>onValueChange(e)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='success'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Grid>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Secret Translator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}