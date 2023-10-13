import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
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
import InputFileUpload from '../../../../../components/InputFileUpload/InputFileUpload';
import { API_URL } from '../../../../../constant';
import { UtilsFunction } from '../../../../../utils';

function UpdateAuthor() {
  const { handleShowSuccess, handleShowError } = UtilsFunction();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: false,
  });

  const handleSetImage = (selectedFile: File | null) => {
    setImage(selectedFile);
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
      name: '',
      description: '',
      active: false,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        handleShowSuccess('Thành công');
        setLoading(false);
        navigate('/admin/management/categories');
      })
      .catch((err) => {
        setLoading(false);
        handleShowError('Không thành công!');
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
        <Grid item xs={12} sx={{ mt: 2 }}>
          <InputFileUpload setImage={handleSetImage} />
          {image && <p>File: {image.name}</p>}
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
export default UpdateAuthor;
