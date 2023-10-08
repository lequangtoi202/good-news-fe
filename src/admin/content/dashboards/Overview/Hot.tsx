import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../constant';
import { ArticleView } from '../../../../model/ArticleView';
import { UtilsFunction } from '../../../../utils';
import MediaCard from '../../../../layout/components/MediaCard/MediaCard';
import { Link } from 'react-router-dom';
import { vi } from 'date-fns/locale';
import { formatDistanceToNow, parseISO } from 'date-fns';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Hot() {
  const [hotArticle, setHotArticle] = useState<ArticleView | null>(null);
  const { handleShowError } = UtilsFunction();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  useEffect(() => {
    const fetchArticleMostViews = async () => {
      try {
        const res = await axios.get(API_URL + `statistic/most-views-article`, {
          headers: {
            Authorization: `Bearer ${token}`,
            ContentType: 'application/json',
          },
        });
        setHotArticle(res.data);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra.');
      }
    };

    fetchArticleMostViews();
  }, []);
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
        <Typography variant="h3">Hot</Typography>
      </Box>
      <Box>
        <div className="category-article d-flex">
          <div
            className="category-thumb"
            style={{ width: '30%', marginRight: '10px', borderRadius: '10px', overflow: 'hidden' }}
          >
            <img style={{ width: '100%' }} src={hotArticle?.article.image} alt={hotArticle?.article.title} />
          </div>
          <div
            className="category-article-title d-flex"
            style={{ flexDirection: 'column', justifyContent: 'space-around' }}
          >
            <h5>
              <Link to={`/article/${hotArticle?.article.id}`}>{hotArticle?.article.title}</Link>
            </h5>
            <div className="d-flex gap-4">
              <div>
                {hotArticle?.article.createdAt &&
                  formatDistanceToNow(new Date(hotArticle.article.createdAt), {
                    locale: vi,
                  })}
              </div>
              <div className="author">
                bởi{' '}
                <strong>
                  <em>{hotArticle?.article.authors.authorName}</em>
                </strong>
              </div>
              <div className="view">
                <strong>
                  <em>{hotArticle?.viewCount}</em>
                </strong>
                <RemoveRedEyeIcon />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Hot;
