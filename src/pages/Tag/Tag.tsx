import AddBoxIcon from '@mui/icons-material/AddBox';
import { Breadcrumbs, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import classNames from 'classnames/bind';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { API_URL } from '../../constant';
import { Article } from '../../model/Article';
import { TagModel } from '../../model/TagModel';
import { RootState } from '../../redux/store';
import { UtilsFunction } from '../../utils';
import styles from './Tag.module.scss';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
const cx = classNames.bind(styles);
function Tag() {
  const { id } = useParams();
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const error = useSelector((state: RootState) => state.error);
  const success = useSelector((state: RootState) => state.success);
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const [tag, setTag] = useState<TagModel | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagResponse = await axios.get(API_URL + `tags/${id}`);
        setTag(tagResponse.data);
        const articlesRes = await axios.get(API_URL + `tags/${id}/articles`);
        setArticles(articlesRes.data);
        const followStatusRes = await axios.get(API_URL + `tags/${id}/articles`);
        setIsFollow(followStatusRes.data);
      } catch (error) {
        handleShowError('Đã xảy ra lỗi!');
      }
    };
    fetchData();
  }, [id]);

  const handleFollowTag = async () => {
    if (token) {
      axios
        .post(
          API_URL + `tags/${id}/follow`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          setIsFollow(res.data.active);
          handleShowSuccess('Thành công');
        })
        .catch((err) => handleShowError('Đã xảy ra lỗi.'));
    } else {
      handleShowError('Vui lòng đăng nhập!');
    }
  };
  return (
    <>
      {error && (
        <div className={cx('error')}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </div>
      )}
      {success && (
        <div className="success">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {error}
          </Alert>
        </div>
      )}
      <div className={cx('wrapper')}>
        <div className={cx('breadcrumb-area')}>
          <div className="container">
            <div className="row">
              <div className={cx('breadcrumb-wrapper', 'col-lg-12')}>
                <div className={cx('breadcrumb-outer', 'd-flex')}>
                  <Breadcrumbs aria-label="breadcrumb" className={cx('breadcrumb-box')}>
                    <Link to="/" style={{ color: 'blue' }}>
                      Trang chủ
                    </Link>
                    <Typography color="text.primary">Tags</Typography>
                    {tag && <Typography color="text.primary">{tag?.name}</Typography>}
                  </Breadcrumbs>
                </div>
                <div className={cx('follow-tag')} onClick={handleFollowTag}>
                  {isFollow ? (
                    <>
                      <span>Theo dõi</span>
                      <AddBoxIcon />
                    </>
                  ) : (
                    <>
                      <span>Hủy Theo dõi</span>
                      <IndeterminateCheckBoxIcon />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('category-wrapper')}>
          <div className={cx('category-outer', 'row')}>
            {articles &&
              articles.length > 0 &&
              articles.map((article) => (
                <div key={article.id} className={cx('category-item', 'col-md-6')}>
                  <div className={cx('category-articles-wrapper')}>
                    <div className={cx('category-article')}>
                      <div className={cx('category-thumb')}>
                        <img src={article.image} alt={article.title} />
                      </div>
                      <div className={cx('category-article-title')}>
                        <h3>
                          <Link to={`/article/${article.id}`}>{article.title}</Link>
                        </h3>
                        <div>
                          {formatDistanceToNow(new Date(article.createdAt), {
                            locale: vi,
                          })}
                        </div>
                        <div className={cx('author')}>
                          bởi{' '}
                          <strong>
                            <em>{article.authors.authorName}</em>
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tag;
