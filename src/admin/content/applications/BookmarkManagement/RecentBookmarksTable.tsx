import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
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
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../constant';
import { Bookmark } from '../../../../model/Bookmark';
import { deleteAny, resetDeleteStatus } from '../../../../redux/adminReducer';
import { UtilsFunction } from '../../../../utils';
import BulkActions from './BulkActions';

interface RecentBookmarksTableProps {
  className?: string;
  bookmarks: Bookmark[];
  totalPages: number;
  totalElements: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

const RecentBookmarksTable: FC<RecentBookmarksTableProps> = ({
  bookmarks,
  totalPages,
  totalElements,
  onPageChange,
  onLimitChange,
}) => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const { handleShowError } = UtilsFunction();
  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
  const selectedBulkActions = selectedBookmarks.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllBookmarks = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedBookmarks(event.target.checked ? bookmarks.map((bookmark) => bookmark.id) : []);
  };

  const handleSelectOneAuthor = (event: ChangeEvent<HTMLInputElement>, bookmarkId: number): void => {
    if (!selectedBookmarks.includes(bookmarkId)) {
      setSelectedBookmarks((prevSelected) => [...prevSelected, bookmarkId]);
    } else {
      setSelectedBookmarks((prevSelected) => prevSelected.filter((id) => id !== bookmarkId));
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

  const handleDeleteBookmark = (bookmarkId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa đánh dấu này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `bookmarks/${bookmarkId}`, {
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

  const selectedSomeBookmarks = selectedBookmarks.length > 0 && selectedBookmarks.length < bookmarks.length;
  const selectedAllBookmarks = selectedBookmarks.length === bookmarks.length;
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
                  checked={selectedAllBookmarks}
                  indeterminate={selectedSomeBookmarks}
                  onChange={handleSelectAllBookmarks}
                />
              </TableCell>
              <TableCell>Bookmark ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Article</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookmarks.map((bookmark) => {
              const isBookmarksSelected = selectedBookmarks.includes(bookmark.id);
              return (
                <TableRow hover key={bookmark.id} selected={isBookmarksSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isBookmarksSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneAuthor(event, bookmark.id)}
                      value={isBookmarksSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {bookmark.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {bookmark.userId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {bookmark.article.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {bookmark.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete bookmark" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteBookmark(bookmark.id)}
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
export default RecentBookmarksTable;
