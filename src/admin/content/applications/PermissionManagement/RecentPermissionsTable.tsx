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
import { ChangeEvent, FC, useState } from 'react';
import { Permission } from '../../../../model/Permission';
import BulkActions from './BulkActions';
import { API_URL } from '../../../../constant';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { UtilsFunction } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { deleteAny, resetDeleteStatus } from '../../../../redux/adminReducer';
import { useNavigate } from 'react-router-dom';

interface RecentPermissionsTableProps {
  className?: string;
  permissions: Permission[];
}

const RecentPermissionsTable: FC<RecentPermissionsTableProps> = ({ permissions }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const { handleShowError } = UtilsFunction();
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const selectedBulkActions = selectedPermissions.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllPermissions = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedPermissions(event.target.checked ? permissions.map((role) => role.id) : []);
  };

  const handleSelectOneArticle = (event: ChangeEvent<HTMLInputElement>, roleId: number): void => {
    if (!selectedPermissions.includes(roleId)) {
      setSelectedPermissions((prevSelected) => [...prevSelected, roleId]);
    } else {
      setSelectedPermissions((prevSelected) => prevSelected.filter((id) => id !== roleId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteRole = (roleId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa quyền này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `roles/${roleId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
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

  const selectedSomePermissions = selectedPermissions.length > 0 && selectedPermissions.length < Permissions.length;
  const selectedAllPermissions = selectedPermissions.length === Permissions.length;
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
                  checked={selectedAllPermissions}
                  indeterminate={selectedSomePermissions}
                  onChange={handleSelectAllPermissions}
                />
              </TableCell>
              <TableCell>Role ID</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((role) => {
              const isPermissionsSelected = selectedPermissions.includes(role.id);
              return (
                <TableRow hover key={role.id} selected={isPermissionsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPermissionsSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneArticle(event, role.id)}
                      value={isPermissionsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {role.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {role.name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit Role" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/admin/management/permissions/edit/${role.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Role" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteRole(role.id)}
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
          count={Permissions.length}
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
export default RecentPermissionsTable;
