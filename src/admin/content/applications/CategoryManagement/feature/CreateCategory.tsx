import { PhotoCamera } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../../constant';
import { UtilsFunction } from '../../../../../utils';

function UpdateAuthor() {
  const { handleShowSuccess, handleShowError } = UtilsFunction();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: false,
  });
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
      description: '',
      active: false,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const categoryReq = {
      name: formData.name,
      description: formData.description,
      active: formData.active,
    };
    const cateFormData = new FormData();
    cateFormData.append('category', JSON.stringify(categoryReq));
    if (image !== null) {
      cateFormData.append('image', image || null);
    }

    axios
      .post(API_URL + 'categories', cateFormData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        handleShowSuccess('Thành công');
        navigate('/admin/management/categories');
      })
      .catch((err) => {
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
        Create category
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Category name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoFocus
          value={formData.description}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox value={formData.active} onChange={handleChange} name="active" color="primary" />}
          label="Active"
        />
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-input"
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <label htmlFor="image-input">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
export default UpdateAuthor;
