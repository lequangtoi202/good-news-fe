import { Breadcrumbs, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import classNames from 'classnames/bind';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { API_URL } from '../../constant';
import { Article } from '../../model/Article';
import { Bookmark } from '../../model/Bookmark';
import { Category } from '../../model/Category';
import { UtilsFunction } from '../../utils';
import styles from './BookmarkComp.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const cx = classNames.bind(styles);
function BookmarkComp() {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const { handleShowError } = UtilsFunction();
  const error = useSelector((state: RootState) => state.error);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<{ [key: string]: Article[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + 'bookmarks/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const bookmarkedData: Bookmark[] = response.data;

        const categoriesResponse = await axios.get(API_URL + 'categories');
        const fetchedCategories = categoriesResponse.data;
        setCategories(fetchedCategories);
        const articlesByCategory: { [key: string]: Article[] } = {};

        bookmarkedData.forEach((bookmark) => {
          const { category, ...rest } = bookmark.article;

          if (!articlesByCategory[category.name]) {
            articlesByCategory[category.name] = [];
          }

          articlesByCategory[category.name].push(rest as Article);
        });

        setBookmarkedArticles(articlesByCategory);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra khi lấy dữ liệu.');
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {error && (
        <div className="error">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </div>
      )}
      <div className={cx('wrapper')}>
        <div className={cx('breadcrumb-area')}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={cx('breadcrumb-outer', 'd-flex')}>
                  <Breadcrumbs aria-label="breadcrumb" className={cx('breadcrumb-box')}>
                    <Link to="/" style={{ color: 'blue' }}>
                      Trang chủ
                    </Link>
                    <Typography color="text.primary">Bookmark</Typography>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('category-wrapper')}>
          <div className={cx('category-outer', 'row')}>
            {categories &&
              categories.length > 0 &&
              categories.map((cate) => {
                const categoryArticles = bookmarkedArticles[cate.name];
                if (categoryArticles && categoryArticles.length > 0) {
                  return (
                    <div key={cate.id} className={cx('category-item', 'col-md-6')}>
                      <div className={cx('category-title')}>
                        <Link to={`/category/${cate.id}`}>
                          <h4>{cate.name}</h4>
                        </Link>
                      </div>
                      <div className={cx('category-articles-wrapper')}>
                        {categoryArticles.map((article) => (
                          <div key={article.id} className={cx('category-article')}>
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
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookmarkComp;
