import { Card } from '@mui/material';
import RecentCategoriesTable from './RecentCategoriesTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../../../../model/Category';
import { API_URL } from '../../../../constant';
import { UtilsFunction } from '../../../../utils';

function RecentCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `categories?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setCategories(res.data.content);
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
      <RecentCategoriesTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        categories={categories}
      />
    </Card>
  );
}

export default RecentCategories;
