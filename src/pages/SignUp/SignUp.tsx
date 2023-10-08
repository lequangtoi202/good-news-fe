import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../constant';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { UtilsFunction } from '../../utils';
import { RootState } from '../../redux/store';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const error = useSelector((state: RootState) => state.error);
  const [userRegistered, setUserRegistered] = useState({});
  const { handleShowError } = UtilsFunction();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: null as Date | null,
    address: '',
    email: '',
  });
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isFullNameEmpty, setIsFullNameEmpty] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'username') {
      setIsUsernameEmpty(value.trim() === '');
    }
    if (name === 'password') {
      setIsPasswordEmpty(value.trim() === '');
    }
    if (name === 'fullName') {
      setIsFullNameEmpty(value.trim() === '');
    }
    if (name === 'email') {
      setIsEmailEmpty(value.trim() === '');
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setIsInvalidEmail(!emailPattern.test(value));
    }
  };
  const clearInputData = () => {
    setFormData({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: null,
      address: '',
      email: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isUsernameEmpty && !isEmailEmpty && !isPasswordEmpty && !isFullNameEmpty) {
      const registerRequest = {
        ...formData,
      };

      const payload = new FormData();
      payload.append('registerRequest', JSON.stringify(registerRequest));
      if (avatar !== null) {
        payload.append('avatar', avatar || null);
      }

      try {
        const response = await axios.post(API_URL + 'auth/register', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setUserRegistered(response.data);
        clearInputData();
      } catch (err) {
        handleShowError('Đăng ký tài khoản không thành công!');
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {error && (
          <div className="error">
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </div>
        )}
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
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                  error={isFullNameEmpty}
                  helperText={isFullNameEmpty ? 'Họ và tên không thể trống.' : ''}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Tên đăng nhập"
                  name="username"
                  variant="outlined"
                  error={isUsernameEmpty}
                  helperText={isUsernameEmpty ? 'Tên đăng nhập không thể trống.' : ''}
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  type="email"
                  variant="outlined"
                  error={isEmailEmpty || isInvalidEmail}
                  helperText={isEmailEmpty ? 'Email không thể trống.' : isInvalidEmail ? 'Email không hợp lệ.' : ''}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  variant="outlined"
                  error={isPasswordEmpty}
                  helperText={isPasswordEmpty ? 'Mật khẩu không thể trống.' : ''}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    border: '1px solid #c4c4c4',
                    borderRadius: '5px',
                    padding: '13px',
                    width: '100%',
                  }}
                >
                  <input style={{ color: '#666666' }} type="date" name="dateOfBirth" onChange={handleChange} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Địa chỉ"
                  id="address"
                  autoComplete="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-input"
                  type="file"
                  onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
                />
                <label htmlFor="avatar-input">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
