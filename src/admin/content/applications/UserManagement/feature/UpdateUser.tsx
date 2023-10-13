import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../../constant';
import { UtilsFunction } from '../../../../../utils';
import { resetDeleteStatus } from '../../../../../redux/adminReducer';
import { useDispatch } from 'react-redux';
import { Grid, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import InputFileUpload from '../../../../../components/InputFileUpload/InputFileUpload';

function UpdateTag() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { handleShowSuccess, handleShowError } = UtilsFunction();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    axios
      .get(API_URL + `users/${id}`)
      .then((res) => {
        const dateOfBirth = res.data.dateOfBirth || '';
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          address: res.data.address,
          dateOfBirth: dateOfBirth,
        });
      })
      .catch((err) => {
        handleShowError('Thất bại');
      });
  }, [id]);

  const handleAvatarChange = (selectedFile: File | null) => {
    setAvatar(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const clearInputData = () => {
    setFormData({
      fullName: '',
      email: '',
      address: '',
      dateOfBirth: '',
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const userReq = {
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
    };
    const formDataReq = new FormData();
    formDataReq.append('userUpdate', JSON.stringify(userReq));
    if (avatar !== null) {
      formDataReq.append('avatar', avatar || null);
    }
    axios
      .put(API_URL + `users/${id}`, formDataReq, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        handleShowSuccess('Thành công');
        setTimeout(() => {
          dispatch(resetDeleteStatus());
        }, 2000);
        setLoading(false);
        navigate('/admin/management/users');
      })
      .catch((err) => {
        setLoading(false);
        handleShowError('Thất bại');
      });
    clearInputData();
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h3">
        Update profile user
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="Full name"
          name="fullName"
          autoFocus
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoFocus
          value={formData.address}
          onChange={handleChange}
        />
        <Grid item xs={12}>
          <div>
            <input
              type="date"
              style={{
                backgroundColor: '#f2f5f9',
                lineHeight: '1rem',
                border: '1px solid #babcbf',
                borderRadius: '10px',
                padding: '16.5px 14px',
                margin: '16px 0 8px 0',
              }}
              name="dateOfBirth"
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <InputFileUpload setImage={handleAvatarChange} />
          {avatar && <p>File: {avatar.name}</p>}
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Box>
    </Box>
  );
}
export default UpdateTag;
