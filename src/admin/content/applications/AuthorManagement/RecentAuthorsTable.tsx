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
import BulkActions from './BulkActions';
import { Author } from '../../../../model/Author';
import { API_URL } from '../../../../constant';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { UtilsFunction } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { deleteAny, resetDeleteStatus } from '../../../../redux/adminReducer';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
interface RecentAuthorsTableProps {
  className?: string;
  authors: Author[];
  totalPages: number;
  totalElements: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

const RecentAuthorsTable: FC<RecentAuthorsTableProps> = ({
  authors,
  totalPages,
  totalElements,
  onPageChange,
  onLimitChange,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const selectedBulkActions = selectedAuthors.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllAuthors = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedAuthors(event.target.checked ? authors.map((author) => author.id) : []);
  };

  const handleSelectOneAuthor = (event: ChangeEvent<HTMLInputElement>, authorId: number): void => {
    if (!selectedAuthors.includes(authorId)) {
      setSelectedAuthors((prevSelected) => [...prevSelected, authorId]);
    } else {
      setSelectedAuthors((prevSelected) => prevSelected.filter((id) => id !== authorId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    onPageChange(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    onLimitChange(newLimit);
  };
  const handleConfirmAuthor = (authorId: number) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xác nhận cho người dùng này không?');
    if (confirm) {
      if (token) {
        axios
          .post(
            API_URL + `authors/${authorId}/confirm`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            handleShowSuccess('Thành công');
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
  const handleDeleteAuthor = (authorId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa quyền này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `authors/${authorId}`, {
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

  const selectedSomeAuthors = selectedAuthors.length > 0 && selectedAuthors.length < authors.length;
  const selectedAllAuthors = selectedAuthors.length === authors.length;
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
                  checked={selectedAllAuthors}
                  indeterminate={selectedSomeAuthors}
                  onChange={handleSelectAllAuthors}
                />
              </TableCell>
              <TableCell>Author ID</TableCell>
              <TableCell>Author Name</TableCell>
              <TableCell>IsConfirmed</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => {
              const isAuthorsSelected = selectedAuthors.includes(author.id);
              return (
                <TableRow hover key={author.id} selected={isAuthorsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isAuthorsSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneAuthor(event, author.id)}
                      value={isAuthorsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {author.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {author.authorName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={author.confirmed} value={author.confirmed} name="active" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {author.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit author" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/admin/management/authors/edit/${author.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete author" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteAuthor(author.id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {author.confirmed ? (
                      <Tooltip title="Confirmed" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.success.lighter,
                            },
                            color: theme.palette.success.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip title="Not Confirmed" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.warning.lighter,
                              },
                              color: theme.palette.warning.main,
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleConfirmAuthor(author.id)}
                          >
                            <WarningIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
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
          count={totalElements}
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
export default RecentAuthorsTable;
