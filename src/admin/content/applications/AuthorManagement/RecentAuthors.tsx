import { Card } from '@mui/material';
import RecentAuthorsTable from './RecentAuthorsTable';
import { Author } from '../../../../model/Author';
import { API_URL } from '../../../../constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { UtilsFunction } from '../../../../utils';

function RecentAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const admin = useSelector((state: RootState) => state.admin);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `authors?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setAuthors(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [admin, pageNumber, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setPageSize(newLimit);
  };
  return (
    <Card>
      <RecentAuthorsTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        authors={authors}
      />
    </Card>
  );
}

export default RecentAuthors;
