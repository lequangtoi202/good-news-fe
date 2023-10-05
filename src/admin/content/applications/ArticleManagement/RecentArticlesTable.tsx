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
import { Article } from '../../../../model/Article';
import BulkActions from './BulkActions';
import { API_URL } from '../../../../constant';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { UtilsFunction } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { deleteAny } from '../../../../redux/adminReducer';

interface RecentArticlesTableProps {
  className?: string;
  articles: Article[];
}

const RecentArticlesTable: FC<RecentArticlesTableProps> = ({ articles }) => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const { handleShowError } = UtilsFunction();
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const selectedBulkActions = selectedArticles.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllArticles = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedArticles(event.target.checked ? articles.map((article) => article.id) : []);
  };

  const handleSelectOneArticle = (event: ChangeEvent<HTMLInputElement>, articleId: number): void => {
    if (!selectedArticles.includes(articleId)) {
      setSelectedArticles((prevSelected) => [...prevSelected, articleId]);
    } else {
      setSelectedArticles((prevSelected) => prevSelected.filter((id) => id !== articleId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteArticle = (articleId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa quyền này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `articles/${articleId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            dispatch(deleteAny(true));
          })
          .catch((err) => {
            handleShowError(err.message);
          });
      } else {
        handleShowError('Vui lòng đăng nhập!');
      }
    }
  };

  const selectedSomeArticles = selectedArticles.length > 0 && selectedArticles.length < articles.length;
  const selectedAllArticles = selectedArticles.length === articles.length;
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
                  checked={selectedAllArticles}
                  indeterminate={selectedSomeArticles}
                  onChange={handleSelectAllArticles}
                />
              </TableCell>
              <TableCell align="center">Article ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Source</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => {
              const isArticleSelected = selectedArticles.includes(article.id);
              return (
                <TableRow hover key={article.id} selected={isArticleSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isArticleSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneArticle(event, article.id)}
                      value={isArticleSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {article.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {article.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {article.source}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <img src={article.image} alt={article.authors.authorName} />
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {article.authors.authorName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteArticle(article.id)}
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
          count={articles.length}
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

export default RecentArticlesTable;
