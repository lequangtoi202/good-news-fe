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
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../constant';
import { Category } from '../../../../model/Category';
import { deleteAny, resetDeleteStatus } from '../../../../redux/adminReducer';
import { UtilsFunction } from '../../../../utils';
import BulkActions from './BulkActions';

interface RecentCategoriesTableProps {
  className?: string;
  categories: Category[];
}

const RecentCategoriesTable: FC<RecentCategoriesTableProps> = ({ categories }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const { handleShowError } = UtilsFunction();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const selectedBulkActions = selectedCategories.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllCategories = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCategories(event.target.checked ? categories.map((article) => article.id) : []);
  };

  const handleSelectOneArticle = (event: ChangeEvent<HTMLInputElement>, articleId: number): void => {
    if (!selectedCategories.includes(articleId)) {
      setSelectedCategories((prevSelected) => [...prevSelected, articleId]);
    } else {
      setSelectedCategories((prevSelected) => prevSelected.filter((id) => id !== articleId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteCategory = (cateId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `categories/${cateId}`, {
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

  const selectedSomeCategories = selectedCategories.length > 0 && selectedCategories.length < categories.length;
  const selectedAllCategories = selectedCategories.length === categories.length;
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
                  checked={selectedAllCategories}
                  indeterminate={selectedSomeCategories}
                  onChange={handleSelectAllCategories}
                />
              </TableCell>
              <TableCell align="center">Category ID</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cate) => {
              const isCategoriesSelected = selectedCategories.includes(cate.id);
              return (
                <TableRow hover key={cate.id} selected={isCategoriesSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCategoriesSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneArticle(event, cate.id)}
                      value={isCategoriesSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cate.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {cate.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {cate.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <img src={cate.image} alt={cate.name} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Checkbox value={cate.active} checked={cate.active} name="active" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Category" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/admin/management/categories/edit/${cate.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Category" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteCategory(cate.id)}
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
          count={categories.length}
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
export default RecentCategoriesTable;
