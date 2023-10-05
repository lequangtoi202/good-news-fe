import { Card } from '@mui/material';
import RecentCategoriesTable from './RecentCategoriesTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../../../../model/Category';
import { API_URL } from '../../../../constant';

function RecentCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    axios
      .get(API_URL + 'categories?pageSize=6&pageNumber=0')
      .then((res) => setCategories(res.data.content))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Card>
      <RecentCategoriesTable categories={categories} />
    </Card>
  );
}

export default RecentCategories;
