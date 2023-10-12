import { Card } from '@mui/material';
import RecentUsersTable from './RecentUsersTable';
import { RootState } from '../../../../redux/store';
import { User } from '../../../../model/User';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../../constant';
import { UtilsFunction } from '../../../../utils';

function RecentUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `users?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setUsers(res.data.content);
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
      <RecentUsersTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        users={users}
      />
    </Card>
  );
}

export default RecentUsers;
