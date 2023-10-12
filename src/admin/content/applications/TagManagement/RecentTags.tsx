import { Card } from '@mui/material';
import RecentTagsTable from './RecentTagsTable';
import axios from 'axios';
import { TagModel } from '../../../../model/TagModel';
import { API_URL } from '../../../../constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { UtilsFunction } from '../../../../utils';

function RecentTags() {
  const [tags, setTags] = useState<TagModel[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `tags?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setTags(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
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
      <RecentTagsTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        tags={tags}
      />
    </Card>
  );
}

export default RecentTags;
