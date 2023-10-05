import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PendingIcon from '@mui/icons-material/Pending';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { API_URL } from '../../constant';
import { Author } from '../../model/Author';
import { RootState } from '../../redux/store';
import { UtilsFunction } from '../../utils';

const defaultTheme = createTheme();

export default function AuthorRequest() {
  const [authorRequest, setAuthorRequest] = useState<Author | null>(null);
  const [authorStatus, setAuthorStatus] = useState<Author | null>(null);
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const error = useSelector((state: RootState) => state.error);
  const success = useSelector((state: RootState) => state.success);
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [formData, setFormData] = useState({
    authorName: '',
  });

  useEffect(() => {
    axios
      .get(API_URL + 'authors/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setAuthorStatus(res.data);
      })
      .catch((err) => {
        handleShowError(err.response.data);
      });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const clearInputData = () => {
    setFormData({
      authorName: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerRequest = {
      ...formData,
    };

    try {
      const response = await axios.post(API_URL + 'authors', JSON.stringify(registerRequest), {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      setAuthorRequest(response.data);
      const res = await axios.get(API_URL + 'authors/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      setAuthorStatus(res.data);
      clearInputData();
      handleShowSuccess('Gửi yêu cầu thành công');
    } catch (err: any) {
      handleShowError(err.response.data);
    }
  };

  return (
    <>
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
            <AlertTitle>Error</AlertTitle>
            {success}
          </Alert>
        </div>
      )}
      {authorStatus && !authorStatus?.confirmed && (
        <div className="text-center m-5">
          <Avatar sx={{ width: 100, height: 100, margin: '0 auto', bgcolor: '#e1b32c' }}>
            <PendingIcon style={{ fontSize: '52px' }} />
          </Avatar>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>Đang chờ xét duyệt</div>
        </div>
      )}
      {!authorStatus && (
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
                Đăng ký tác giả
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="authorName"
                      required
                      fullWidth
                      id="authorName"
                      label="Bút danh"
                      value={formData.authorName}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Gửi yêu cầu
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
      {authorStatus && authorStatus.confirmed && (
        <div className="text-center m-5">
          <Avatar sx={{ width: 100, height: 100, margin: '0 auto', bgcolor: '#3b9a4c' }}>
            <CheckCircleIcon style={{ fontSize: '52px' }} />
          </Avatar>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>Yêu cầu đã được duyệt</div>
        </div>
      )}
    </>
  );
}
