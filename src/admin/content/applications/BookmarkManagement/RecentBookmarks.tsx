import { Card } from '@mui/material';
import RecentBookmarksTable from './RecentBookmarksTable';
import { useEffect, useState } from 'react';
import { Bookmark } from '../../../../model/Bookmark';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import axios from 'axios';
import { API_URL } from '../../../../constant';
import { UtilsFunction } from '../../../../utils';

function RecentBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `bookmarks?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setBookmarks(res.data.content);
      })
      .catch((err) => handleShowError('Đã xảy ra lỗi'));
  }, [admin, pageNumber, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setPageSize(newLimit);
  };
  return (
    <Card>
      <RecentBookmarksTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        bookmarks={bookmarks}
      />
    </Card>
  );
}

export default RecentBookmarks;
