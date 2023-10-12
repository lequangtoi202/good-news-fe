import { Card } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../../constant';
import { Article } from '../../../../model/Article';
import { UtilsFunction } from '../../../../utils';
import RecentArticlesTable from './RecentArticlesTable';

function RecentArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `articles?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setArticles(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => handleShowError('Đã xảy ra lỗi'));
  }, [pageNumber, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setPageSize(newLimit);
  };

  return (
    <Card>
      <RecentArticlesTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        articles={articles}
      />
    </Card>
  );
}

export default RecentArticles;
