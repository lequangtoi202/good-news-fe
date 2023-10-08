import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { TextareaAutosize } from '@mui/base';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearError, setError } from '../../../../../redux/errorReducer';
import { API_URL } from '../../../../../constant';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { UtilsFunction } from '../../../../../utils';

const textarea = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  backgroundColor: 'transparent',
  fontFamily: 'Roboto, sans-serif',
};

function UpdateArticle() {
  const { id } = useParams();
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    source: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const clearInputData = () => {
    setFormData({
      title: '',
      content: '',
      source: '',
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        Update article
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
          aria-invalid
          value={id}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          style={textarea}
          onChange={handleChangeTextArea}
          name="content"
          value={formData.content}
          rows={6}
          placeholder="Type content article..."
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="source"
          label="Source"
          name="source"
          autoFocus
          value={formData.source}
          onChange={handleChange}
        />
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-input"
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <label htmlFor="avatar-input">
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
export default UpdateArticle;
