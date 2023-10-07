import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../constant';
import { User } from '../../../../model/User';
import { deleteAny, resetDeleteStatus } from '../../../../redux/adminReducer';
import { UtilsFunction } from '../../../../utils';
import BulkActions from './BulkActions';

interface RecentUsersTableProps {
  className?: string;
  users: User[];
}

const RecentUsersTable: FC<RecentUsersTableProps> = ({ users }) => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleShowError } = UtilsFunction();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const selectedBulkActions = selectedUsers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOneUser = (event: ChangeEvent<HTMLInputElement>, userId: number): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteUser = (userId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa user này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch(deleteAny(true));
            setTimeout(() => {
              dispatch(resetDeleteStatus());
            }, 2000);
          })
          .catch((err) => {
            handleShowError(err.message);
          });
      } else {
        handleShowError('Vui lòng đăng nhập!');
      }
    }
  };
  const selectedSomeUsers = selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isUsersSelected = selectedUsers.includes(user.id);
              return (
                <TableRow hover key={user.id} selected={isUsersSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUsersSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneUser(event, user.id)}
                      value={isUsersSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {user.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {user.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {user.fullName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {user.dateOfBirth}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <img style={{ width: '80px', height: '80px' }} src={user.avatar} alt={user.username} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {user.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/admin/management/users/edit/${user.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={users.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};
export default RecentUsersTable;
