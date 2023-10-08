import { PhotoCamera } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MultiSelect from '../../../../../components/MultiSelect/MultiSelect';
import CustomSelect from '../../../../../components/Select/Select';
import { API_URL } from '../../../../../constant';
import { clearError, setError } from '../../../../../redux/errorReducer';

const textarea = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  backgroundColor: 'transparent',
  fontFamily: 'Roboto, sans-serif',
};

function CreateArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
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

  const [selectedOption, setSelectedOption] = useState<string>('Option 1');
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
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
        Create article
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
        <label htmlFor="category">Category: </label>
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
        <CustomSelect label="Select an option" options={options} value={selectedOption} onChange={handleSelectChange} />
        <MultiSelect
          label="Select Options"
          options={['Option 1', 'Option 2', 'Option 5']}
          selectedValues={['Option 1']}
          onChange={(selected) => {
            console.log('Selected:', selected);
          }}
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

export default CreateArticle;
