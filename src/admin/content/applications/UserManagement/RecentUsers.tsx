import { Card } from '@mui/material';
import RecentUsersTable from './RecentUsersTable';
import { RootState } from '../../../../redux/store';
import { User } from '../../../../model/User';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../../constant';

function RecentUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    axios
      .get(API_URL + 'users?pageSize=6&pageNumber=0')
      .then((res) => setUsers(res.data.content))
      .catch((err) => console.log(err));
  }, [admin]);

  return (
    <Card>
      <RecentUsersTable users={users} />
    </Card>
  );
}

export default RecentUsers;
