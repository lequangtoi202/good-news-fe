import { Card } from '@mui/material';
import RecentAuthorsTable from './RecentAuthorsTable';
import { Author } from '../../../../model/Author';
import { API_URL } from '../../../../constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

function RecentAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    axios
      .get(API_URL + 'authors?pageSize=6&pageNumber=0')
      .then((res) => setAuthors(res.data.content))
      .catch((err) => console.log(err));
  }, [admin]);
  return (
    <Card>
      <RecentAuthorsTable authors={authors} />
    </Card>
  );
}

export default RecentAuthors;
