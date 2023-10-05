import { Card } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../../constant';
import { Article } from '../../../../model/Article';
import RecentArticlesTable from './RecentArticlesTable';

function RecentArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    axios
      .get(API_URL + 'articles?pageSize=6&pageNumber=1')
      .then((res) => setArticles(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card>
      <RecentArticlesTable articles={articles} />
    </Card>
  );
}

export default RecentArticles;
