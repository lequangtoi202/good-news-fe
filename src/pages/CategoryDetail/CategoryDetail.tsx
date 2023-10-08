import { Breadcrumbs, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { API_URL } from '../../constant';
import { Article } from '../../model/Article';
import { Category } from '../../model/Category';
import { UtilsFunction } from '../../utils';
import styles from './CategoryDetail.module.scss';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const cx = classNames.bind(styles);

function CategoryDetail() {
  const error = useSelector((state: RootState) => state.error);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleTop, setArticleTop] = useState<Article[]>([]);
  const [articleTop3, setArticleTop3] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const { handleShowError } = UtilsFunction();
  const { id } = useParams();
  useEffect(() => {
    const fetchTop3NewestArticles = async () => {
      try {
        const res = await axios.get(API_URL + `categories/${id}/articles/newest?limit=4`);

        const fetchedArticle = res.data.filter((relatedArticle: Article) => relatedArticle.id !== articleTop[0]?.id);
        setArticleTop3(fetchedArticle);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra.');
      }
    };

    fetchTop3NewestArticles();
  }, [articleTop]);
  useEffect(() => {
    const fetchAllRestArticles = async () => {
      try {
        const res = await axios.get(API_URL + `categories/${id}/articles`);
        const allArticles = res.data;

        const restArticles = allArticles.filter((article: Article) => {
          return article.id !== articleTop[0]?.id && !articleTop3.some((a) => a.id === article.id);
        });

        setArticles(restArticles);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra khi lấy dữ liệu.');
      }
    };
    fetchAllRestArticles();
  }, [articleTop, articleTop3]);
  useEffect(() => {
    const fetchTopArticle = async () => {
      try {
        const res = await axios.get(API_URL + `categories/${id}/articles/newest?limit=1`);
        const fetchedArticle = res.data;

        setArticleTop(fetchedArticle);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra khi lấy dữ liệu.');
      }
    };

    fetchTopArticle();
    const fetchCategory = async () => {
      try {
        const res = await axios.get(API_URL + `categories/${id}`);
        const fetchedCategory = res.data;

        setCategory(fetchedCategory);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra khi lấy dữ liệu.');
      }
    };

    fetchCategory();
  }, [id]);
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
                    <Typography color="text.primary">Chủ đề</Typography>
                    <Typography color="text.primary">{category?.name}</Typography>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>
        {articleTop.length > 0 && (
          <>
            <div className={cx('category')}>{articleTop && <h4>{articleTop[0]?.category.name}</h4>}</div>
            <div className={cx('articles-wrapper')}>
              <div className={cx('articles-outer')}>
                <div className={cx('article-newest')}>
                  <div className={cx('article-newest-thumb', 'col-md-6')}>
                    <img src={articleTop[0]?.image} alt="" />
                  </div>
                  <div className={cx('article-newest-item')}>
                    <div className={cx('article-newest-title')}>
                      <h5>
                        <Link to={`/article/${articleTop[0]?.id}`}>{articleTop[0]?.title}</Link>
                      </h5>
                    </div>
                    <div className={cx('article-newest-short-description')}>
                      <div className={cx('article-newest-description')}>{articleTop[0]?.content}</div>
                      <div className={cx('article-newest-time')}>
                        <div>
                          {formatDistanceToNow(new Date(articleTop[0]?.createdAt), {
                            locale: vi,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('sub-article-top')}>
                  <div className={cx('sub-inner-article-top')}>
                    <div className={cx('scroll-sub-featured')}>
                      <ul className={cx('list-sub-feature')}>
                        {articleTop3 &&
                          articleTop3.length > 0 &&
                          articleTop3.map((article) => (
                            <li key={article.id}>
                              <h3 className={cx('article-title')}>
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                              </h3>
                              <p className={cx('article-description')}>
                                <Link to={`/article/${article.id}`}>{article.content}</Link>
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={cx('category-articles-wrapper')}>
                  {articles &&
                    articles.map((article) => (
                      <div key={article.id} className={cx('category-article')}>
                        <div className={cx('category-thumb')}>
                          <img src={article.image} alt={article.title} />
                        </div>
                        <div className={cx('category-article-title')}>
                          <h3>
                            <Link to={`/article/${article.id}`}>{article.title}</Link>
                            <Link to={'/'}>Title</Link>
                          </h3>
                          <div>
                            {formatDistanceToNow(new Date(article.createdAt), {
                              locale: vi,
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CategoryDetail;
