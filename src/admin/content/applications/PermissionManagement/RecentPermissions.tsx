import { Card } from '@mui/material';
import RecentPermissionsTable from './RecentPermissionsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../constant';
import { Permission } from '../../../../model/Permission';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';

function RecentPermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    axios
      .get(API_URL + 'roles?pageSize=6&pageNumber=0')
      .then((res) => setPermissions(res.data.content))
      .catch((err) => console.log(err));
  }, [admin]);
  return (
    <Card>
      <RecentPermissionsTable permissions={permissions} />
    </Card>
  );
}

export default RecentPermissions;
