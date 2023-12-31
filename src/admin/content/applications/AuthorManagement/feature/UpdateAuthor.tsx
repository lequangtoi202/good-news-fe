import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../../constant';
import { resetDeleteStatus } from '../../../../../redux/adminReducer';
import { UtilsFunction } from '../../../../../utils';
import LoadingButton from '@mui/lab/LoadingButton';

function UpdateAuthor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { handleShowSuccess, handleShowError } = UtilsFunction();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');

  const [formData, setFormData] = useState({
    authorName: '',
  });

  useEffect(() => {
    axios
      .get(API_URL + `authors/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        setFormData({
          authorName: res.data.authorName,
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const authorReq = {
      authorName: formData.authorName,
    };
    axios
      .put(API_URL + `authors/${id}`, JSON.stringify(authorReq), {
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
        navigate('/admin/management/authors');
      })
      .catch((err) => {
        setLoading(false);
        handleShowError('Thất bại');
      });
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
        Update author
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="authorName"
          label="AuthorName"
          name="authorName"
          autoFocus
          value={formData.authorName}
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
export default UpdateAuthor;
