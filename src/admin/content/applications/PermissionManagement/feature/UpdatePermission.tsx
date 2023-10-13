import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
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

function UpdatePermission() {
  const { id } = useParams();
  const { handleShowSuccess, handleShowError } = UtilsFunction();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    axios
      .get(API_URL + `roles/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name,
        });
      })
      .catch((err) => {
        handleShowError('Thất bại');
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const clearInputData = () => {
    setFormData({
      name: '',
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const roleReq = {
      name: formData.name,
    };
    axios
      .put(API_URL + `roles/${id}`, JSON.stringify(roleReq), {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        handleShowSuccess('Thành công');
        setTimeout(() => {
          dispatch(resetDeleteStatus());
        }, 2000);
        setLoading(false);
        navigate('/admin/management/permissions');
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
        Update permission
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Role name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
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
export default UpdatePermission;
