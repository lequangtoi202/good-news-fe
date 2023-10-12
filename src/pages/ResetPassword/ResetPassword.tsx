import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../constant';
import { RootState } from '../../redux/store';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { UtilsFunction } from '../../utils';

function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const error = useSelector((state: RootState) => state.error);
  const success = useSelector((state: RootState) => state.success);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}users/reset-password?token=${token}`)
        .then((response) => {})
        .catch((error) => {
          handleShowError('Token không hợp lệ');
        });
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setIsPasswordEmpty(value.trim() === '');
      setPassword(value);
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      handleShowError('Mật khẩu không trùng khớp');
    } else {
      try {
        const response = await axios.post(API_URL + 'users/reset-password', null, {
          params: {
            token: token,
            password: password,
            confirmPassword: confirmPassword,
          },
        });
        handleShowSuccess('Reset mật khẩu thành công');
      } catch (error) {
        handleShowError('Đã xảy ra lỗi');
      }
    }
    setPassword('');
    setConfirmPassword('');
  };

  const defaultTheme = createTheme();

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
        {success && (
          <div className="success">
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              {success}
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
            RESET MẬT KHẨU
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
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
                  value={password}
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
                  value={confirmPassword}
                  onChange={handleChange}
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Reset mật khẩu
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
