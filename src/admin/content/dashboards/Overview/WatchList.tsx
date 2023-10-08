import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { API_URL } from '../../../../constant';
import { Article } from '../../../../model/Article';
import { UtilsFunction } from '../../../../utils';
import WatchListColumn from './WatchListColumn';

function WatchList() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');
  const [articleTop3, setArticleTop3] = useState<Article[]>([]);
  const { handleShowError } = UtilsFunction();
  useEffect(() => {
    const fetchTop3NewestArticles = async () => {
      try {
        const res = await axios.get(API_URL + `articles/top3`);

        setArticleTop3(res.data);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra.');
      }
    };

    fetchTop3NewestArticles();
  }, []);

  const handleViewOrientation = (_event: MouseEvent<HTMLElement>, newValue: string | null) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3,
        }}
      >
        <Typography variant="h3">Watch List</Typography>
        <ToggleButtonGroup value={tabs} exclusive onChange={handleViewOrientation}>
          <ToggleButton disableRipple value="watch_list_columns">
            <ViewWeekTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {tabs === 'watch_list_columns' && <WatchListColumn articles={articleTop3} />}
    </>
  );
}

export default WatchList;
