import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import CustomSelect from '../../../../../components/Select/Select';
import { API_URL } from '../../../../../constant';
import { UtilsFunction } from '../../../../../utils';

function CrawlData() {
  const cookies = new Cookies();
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const token = cookies.get('accessToken');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('VnExpress');
  const options = ['VnExpress', 'Tuổi trẻ', 'Pháp luật'];

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitted');
    if (selectedOption === 'VnExpress') {
      setIsLoading(true);
      try {
        const response = await axios.post(
          API_URL + '/crawl-articles-vnExpress',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) handleShowSuccess('Thành công!');
      } catch (error) {
        handleShowError('Cào dữ liệu không thành công!');
      } finally {
        setIsLoading(false);
      }
    } else {
      handleShowError('Tính năng này đang được cập nhật, vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <Typography component="h1" variant="h3">
        Crawling data from plenty resources
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        className="d-flex"
        style={{ alignItems: 'center' }}
      >
        <CustomSelect label="Chọn nguồn" options={options} value={selectedOption} onChange={handleSelectChange} />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, ml: 3 }}>
          Crawl data
        </Button>
      </Box>
      <div className="d-flex" style={{ justifyContent: 'center' }}>
        {isLoading && <CircularProgress color="success" />}
      </div>
    </>
  );
}

export default CrawlData;
