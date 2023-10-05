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
import { TagModel } from '../../../../model/TagModel';
import BulkActions from './BulkActions';
import { API_URL } from '../../../../constant';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { UtilsFunction } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { deleteAny, resetDeleteStatus } from '../../../../redux/adminReducer';
import { useNavigate } from 'react-router-dom';

interface RecentTagsTableProps {
  className?: string;
  tags: TagModel[];
}
const RecentTagsTable: FC<RecentTagsTableProps> = ({ tags }) => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleShowError } = UtilsFunction();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const selectedBulkActions = selectedTags.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllTags = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedTags(event.target.checked ? tags.map((tag) => tag.id) : []);
  };

  const handleSelectOneArticle = (event: ChangeEvent<HTMLInputElement>, tagId: number): void => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags((prevSelected) => [...prevSelected, tagId]);
    } else {
      setSelectedTags((prevSelected) => prevSelected.filter((id) => id !== tagId));
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteTag = (tagId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tag này không?');
    if (confirmDelete) {
      if (token) {
        axios
          .delete(API_URL + `tags/${tagId}`, {
            headers: {
              Authorization: 'Bearer ' + token,
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
  const selectedSomeTags = selectedTags.length > 0 && selectedTags.length < tags.length;
  const selectedAllTags = selectedTags.length === tags.length;
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
                  checked={selectedAllTags}
                  indeterminate={selectedSomeTags}
                  onChange={handleSelectAllTags}
                />
              </TableCell>
              <TableCell>Tag ID</TableCell>
              <TableCell>Tag Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => {
              const isTagsSelected = selectedTags.includes(tag.id);
              return (
                <TableRow hover key={tag.id} selected={isTagsSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTagsSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSelectOneArticle(event, tag.id)}
                      value={isTagsSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {tag.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {tag.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Tag" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/admin/management/tags/edit/${tag.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Tag" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteTag(tag.id)}
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
          count={tags.length}
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
export default RecentTagsTable;
