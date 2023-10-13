import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputFileUpload from '../../../../../components/InputFileUpload/InputFileUpload';
import MultiSelect from '../../../../../components/MultiSelect/MultiSelect';
import CustomSelect from '../../../../../components/Select/Select';
import { Category } from '../../../../../model/Category';
import { TagModel } from '../../../../../model/TagModel';
import axios from 'axios';
import { API_URL } from '../../../../../constant';
import Cookies from 'universal-cookie';

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
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTagOption, setSelectedTagOption] = useState<string[]>([]);
  const [selectedCateOption, setSelectedCateOption] = useState<string>('');
  const [categoriesLabels, setCategoriesLabels] = useState<string[]>([]);
  const [tagLabels, setTagsLabels] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    source: '',
  });

  useEffect(() => {
    axios.get(API_URL + 'categories').then((res) => {
      const categories = res.data.map((cate: Category) => cate.id.toString());
      setCategoriesLabels(res.data.map((cate: Category) => cate.name));
      setCategories(categories);
    });

    axios.get(API_URL + 'tags').then((res) => {
      const tags = res.data;
      setTags(tags.map((tag: TagModel) => tag.id.toString()));
      setTagsLabels(res.data.map((tag: TagModel) => tag.name));
    });
  }, []);
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
  const handleSetImage = (selectedFile: File | null) => {
    setImage(selectedFile);
  };

  const clearInputData = () => {
    setFormData({
      title: '',
      content: '',
      source: '',
    });
  };

  const handleSelectChange = (value: string) => {
    setSelectedCateOption(value);
  };

  const handleMultiSelectChange = (value: string[]) => {
    setSelectedTagOption(value);
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
        <Grid item sx={{ mt: 2 }}>
          <CustomSelect
            text={categoriesLabels}
            label="Chọn danh mục"
            options={categories}
            value={selectedCateOption}
            onChange={handleSelectChange}
          />
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          <MultiSelect
            text={tagLabels}
            label="Chọn thẻ"
            options={tags}
            selectedValues={selectedTagOption}
            onChange={handleMultiSelectChange}
          />
        </Grid>
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

export default CreateArticle;
