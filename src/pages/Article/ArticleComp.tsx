/* eslint-disable react-hooks/exhaustive-deps */
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import { Avatar, Breadcrumbs, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';

import CommentBox from '../../components/CommentBox';
import Tag from '../../components/Tag/Tag';
import { API_URL } from '../../constant';
import MediaCard from '../../layout/components/MediaCard/MediaCard';
import { Article } from '../../model/Article';
import { Bookmark } from '../../model/Bookmark';
import { addBookmark, setBookmarks } from '../../redux/bookmarkReducer';
import { RootState } from '../../redux/store';
import { UtilsFunction } from '../../utils';
import styles from './Article.module.scss';

const cx = classNames.bind(styles);
function ArticleComp() {
  const { id } = useParams();
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const bookmarks = useSelector((state: RootState) => state.bookmarks);
  const dispatch = useDispatch();
  const articleId = id ? parseInt(id) : null;
  const isBookmarked = bookmarks.some((bookmark) => bookmark?.article?.id === articleId);
  const error = useSelector((state: RootState) => state.error);
  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const { handleShowError } = UtilsFunction();
  let paragraphs: string[] = [];

  useEffect(() => {
    if (token) {
      const apiTimeoutId = setTimeout(() => {
        axios
          .post(
            API_URL + `articles/${id}/user-articles`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          .then((response) => {})
          .catch((error) => {
            handleShowError('Đã xảy ra lỗi');
          });
      }, 60000);

      return () => {
        clearTimeout(apiTimeoutId);
      };
    }
  }, []);
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(API_URL + 'bookmarks/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setBookmarks(response.data));
      } catch (error) {
        handleShowError('Đã xảy ra lỗi');
      }
    };
    if (token) {
      fetchBookmarks();
    }
  }, []);
  useEffect(() => {
    const getRelatedArticle = async () => {
      if (article) {
        try {
          const categoryResponse = await axios.get(API_URL + `categories/${article.category.id}/articles`);
          const relatedArticles = categoryResponse.data.filter(
            (relatedArticle: Article) => relatedArticle.id !== article.id,
          );

          setArticles(relatedArticles);
        } catch (error) {
          handleShowError('Đã xảy ra lỗi.');
        }
      }
    };
    getRelatedArticle();
  }, [article]);

  useEffect(() => {
    const getArticleDetail = async () => {
      try {
        const response = await axios.get(API_URL + `articles/${id}`);
        await setArticle(response.data);
      } catch (error) {
        handleShowError('Đã xảy ra lỗi.');
      }
    };
    getArticleDetail();
  }, [id]);

  const splitParagraph = (text: string, maxLength: number) => {
    const sentences = text.split('. ');
    const result = [];
    let currentParagraph = '';

    for (const sentence of sentences) {
      if (currentParagraph.length + sentence.length <= maxLength) {
        currentParagraph += sentence + '. ';
      } else {
        result.push(currentParagraph.trim());
        currentParagraph = sentence + '. ';
      }
    }
    if (currentParagraph) {
      result.push(currentParagraph.trim());
    }

    return result;
  };
  if (article) {
    paragraphs = splitParagraph(article.content, 800);
  }

  const onBookmarkClick = async (articleId: number) => {
    const fetchAddBookmark = async () => {
      try {
        var formData = new FormData();
        formData.append('articleId', articleId.toString());
        const response = await axios.post(API_URL + `bookmarks`, formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 204) {
          const newBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.article.id !== articleId);
          dispatch(setBookmarks(newBookmarks));
        } else {
          dispatch(addBookmark(response.data));
        }
        return response.data;
      } catch (error) {
        handleShowError('Đã xảy ra lỗi.');
      }
    };
    fetchAddBookmark();
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
      <div className={cx('wrapper')}>
        <div className={cx('breadcrumb-area')}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={cx('breadcrumb-outer', 'd-flex')}>
                  <Breadcrumbs aria-label="breadcrumb" className={cx('breadcrumb-box')}>
                    <RouterLink to="/" style={{ color: 'blue' }}>
                      Trang chủ
                    </RouterLink>
                    <Typography color="text.primary">{article?.category.name}</Typography>
                  </Breadcrumbs>
                  <div>
                    {article
                      ? format(new Date(article.createdAt), 'EEEE, dd/MM/yyyy, HH:mm (zzz)', { locale: viLocale })
                      : 'Ngày tạo không khả dụng'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('author-item-area', 'pd-20')}>
          {article && (
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className={cx('author-item', 'mb-40')}>
                    <div className={cx('thumb')}>
                      <img alt="" src={article.image}></img>
                    </div>
                    <div className={cx('content')}>
                      <div className={cx('meta-item')}>
                        <div className={cx('meta-categories')}>
                          <RouterLink to={`/category/${article.category.id}`}>{article.category.name}</RouterLink>
                        </div>
                        <div className={cx('meta-date')}>
                          <span>
                            <i className="far fa-calendar-alt"></i>
                            {format(new Date(article.createdAt), 'dd/MM/yyyy')}
                          </span>
                        </div>
                        <div className={cx('meta-bookmark')}>
                          <TurnedInNotOutlinedIcon
                            onClick={() => onBookmarkClick(article.id)}
                            style={{ cursor: 'pointer', display: isBookmarked ? 'none' : 'inline' }}
                          />
                          <BookmarkIcon
                            onClick={() => onBookmarkClick(article.id)}
                            style={{
                              cursor: 'pointer',
                              color: 'rgb(255 201 7)',
                              display: isBookmarked ? 'inline' : 'none',
                            }}
                          />
                        </div>
                      </div>
                      <h3 className={cx('title')}>{article.title}</h3>
                      <div className={cx('meta-author')}>
                        <div className={cx('auhtor')}>
                          <Avatar alt="Remy Sharp" src={article.authors.user.avatar} />
                          <span>
                            By <span>{article.authors.authorName}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={cx('article-details-box')}>
                      <div className={cx('article-details')}>
                        {article && paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                      </div>
                      <div>
                        <strong>Nguồn:</strong> <a href={article.source}>{article.source}</a>
                        <div>
                          <strong>Tags: </strong>
                          <Tag articleId={article.id} />
                        </div>
                      </div>
                      {
                        <div className={cx('article-comment-wrapper')}>
                          <div className={cx('article-comment-outer')}>
                            <h5>Bình luận</h5>
                          </div>
                          <CommentBox article={article} />
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-lg-3"></div>
              </div>
            </div>
          )}
        </div>
        <div className={cx('article-related')}>
          <div className={cx('article-related-title')}>
            <h3 className={cx('title')}>Dành cho bạn</h3>
          </div>
          <div className={cx('article-list-topic', 'row')}>
            {articles && articles.length > 0 ? (
              articles
                .slice(0, 4)
                .map((article, index) => (
                  <MediaCard key={index} article={article} className={cx('article-item', 'col-md-3 col-sm-4 col-12')} />
                ))
            ) : (
              <p>No articles to display</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleComp;
