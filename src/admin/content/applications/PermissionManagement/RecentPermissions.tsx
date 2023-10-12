import { Card } from '@mui/material';
import RecentPermissionsTable from './RecentPermissionsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../constant';
import { Permission } from '../../../../model/Permission';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { UtilsFunction } from '../../../../utils';

function RecentPermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const { handleShowError } = UtilsFunction();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(API_URL + `roles?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .then((res) => {
        setPermissions(res.data.content);
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
      <RecentPermissionsTable
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        permissions={permissions}
      />
    </Card>
  );
}

export default RecentPermissions;
