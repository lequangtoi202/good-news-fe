import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../auth/AuthContext';
import { API_URL, GOOGLE_CLIENT_ID } from '../../constant';
import { clearError, setError } from '../../redux/errorReducer';
import { RootState } from '../../redux/store';
import { login } from '../../redux/userReducer';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const error = useSelector((state: RootState) => state.error);
  const { setCurrentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${API_URL}users/by-username?username=${formData.username}`);

      const user = response.data;
      const loginRequest = {
        username: user.username,
        password: formData.password,
      };

      try {
        const res: AxiosResponse = await axios.post(API_URL + 'auth/login', JSON.stringify(loginRequest), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const resToken = await res.data;
        const accessToken = resToken.accessToken;
        const refreshToken = resToken.refreshToken;
        document.cookie = `accessToken=${accessToken}; Path=/;`;
        document.cookie = `refreshToken=${refreshToken}; Path=/;`;
        const response: AxiosResponse = await axios.get(API_URL + 'users/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        });
        setCurrentUser(response.data);
        dispatch(login({ payload: { userInfo: resToken.accessToken } }));
        dispatch(clearError());
        navigate('/');
      } catch (err: any) {
        if (err.response.status === 400) {
          dispatch(setError(err.response.data));
          setTimeout(() => {
            dispatch(clearError());
          }, 3000);
        }
        if (err.response.status === 500) {
          dispatch(setError('Đã có lỗi xảy ra!'));
          setTimeout(() => {
            dispatch(clearError());
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setError('Username không đã tồn tại'));
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  };

  //=========Tạm ngưng chức năng này==========
  const responseGoogle = (response: any) => {
    var decoded: any = jwt_decode(response.credential);
    const user = {
      email: decoded.email,
      avatar: decoded.picture,
      fullName: decoded.name,
      username: decoded.email,
    };
    console.log(user);
  };

  const handleErrorGoogle = () => {};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
              name="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <div style={{ margin: '0 auto' }}>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin onSuccess={responseGoogle} onError={handleErrorGoogle} />
              </GoogleOAuthProvider>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
