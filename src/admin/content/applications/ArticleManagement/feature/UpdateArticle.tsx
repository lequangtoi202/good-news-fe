import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputFileUpload from '../../../../../components/InputFileUpload/InputFileUpload';
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
  const [loading, setLoading] = useState(false);
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

  const handleImageChange = (selectedFile: File | null) => {
    setImage(selectedFile);
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
        <Grid item xs={12} sx={{ mt: 2 }}>
          <InputFileUpload setImage={handleImageChange} />
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
export default UpdateArticle;
