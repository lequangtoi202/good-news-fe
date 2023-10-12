import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { API_URL } from '../../constant';
import { RootState } from '../../redux/store';
import { UtilsFunction } from '../../utils';

function ForgotPassword() {
  const error = useSelector((state: RootState) => state.error);
  const success = useSelector((state: RootState) => state.success);
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setIsEmailEmpty(value.trim() === '');
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setIsInvalidEmail(!emailPattern.test(value));
    }
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}users/forgot-password?email=${email}`);
      setIsLoading(false);
      handleShowSuccess('Thành công');

      setEmail('');
    } catch (err: any) {
      setIsLoading(false);
      if (err.response.status === 400) {
        handleShowError('Email không tồn tại');
      } else {
        handleShowError('Yêu cầu reset password không thành công!');
      }
      setEmail('');
    }
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
            QUÊN MẬT KHẨU
          </Typography>
          <p>Nhập địa chỉ email để nhận đường link reset lại mật khẩu</p>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                value={email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Gửi
            </Button>
          </Box>
          {isLoading && <CircularProgress color="success" />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
