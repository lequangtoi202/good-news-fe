import { Avatar } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../auth/AuthContext';
import Image from '../../components/Image';
import Tag from '../../components/Tag/Tag';
import { API_URL } from '../../constant';
import MediaCard from '../../layout/components/MediaCard/MediaCard';
import { Article } from '../../model/Article';
import { Category } from '../../model/Category';
import { UtilsFunction } from '../../utils';
import styles from './Home.module.scss';
import { RootState } from '../../redux/store';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
  const { currentUser } = useAuth();
  const error = useSelector((state: RootState) => state.error);
  const { handleShowError } = UtilsFunction();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleArticles, setVisibleArticles] = useState(5);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    axios
      .get(API_URL + 'articles-status?type=published')
      .then((response) => {
        setArticles(response.data);
      })
      .catch(() => {
        handleShowError('Đã có lỗi xảy ra');
      });
    axios
      .get(API_URL + 'categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        handleShowError('Đã có lỗi xảy ra');
      });
  }, []);
  const handleScroll = () => {
    if (containerRef.current) {
      if (containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight) {
        setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 5);
      }
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

      <div ref={containerRef} onScroll={handleScroll} className={cx('wrapper')}>
        <ul className={cx('categories-section')}>
          {categories &&
            categories.length > 0 &&
            categories.slice(0, 10).map((category) => (
              <li key={category.id} className={cx('categories-item')}>
                <Link to={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
        </ul>
        <Link to="/admin/management/tags">Vào admin</Link>
        <div className={'container'}>
          <div className={cx('article-wrapper')}>
            <div className={cx('trending-section', 'row')}>
              <div className={cx('articles', 'col-md-9 col-sm-12 col-12')}>
                {articles &&
                  articles.length > 0 &&
                  articles.slice(0, 4).map((article) => (
                    <div key={article.id} className={cx('article-outer')}>
                      <div className={cx('article', 'row')}>
                        <div className={cx('article-img', 'col-md-3 col-sm-6 col-12')}>
                          <Image src={article.image} />
                        </div>

                        <div className={cx('article-content', 'col-md-9 col-sm-6 -col-12')}>
                          <div className={cx('article-tag-outer')}>
                            <div className={cx('article-tag')}>
                              <Link to={`/category/${article.category.id}`}>{article.category.name}</Link>
                            </div>
                            <div className={cx('article-time')}>
                              <span>
                                <i className="far fa-calendar-alt"></i>
                                {format(new Date(article.createdAt), 'dd/MM/yyyy')}
                              </span>
                            </div>
                          </div>
                          <div className={cx('title')}>
                            <h4>
                              <Link to={`/article/${article.id}`}>{article.title}</Link>
                            </h4>
                          </div>
                          <div>
                            Tags: <Tag articleId={article.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={cx('categories', 'col-md-3 col-sm-12 col-12')}>
                <div className={cx('header')}>
                  <h4>Danh mục</h4>
                </div>
                <div className={cx('category-outer')}>
                  <div className={cx('category-list')}>
                    {categories &&
                      categories.length > 0 &&
                      categories.slice(0, 5).map((category) => (
                        <div
                          key={category.id}
                          className={cx('category-item')}
                          style={{
                            backgroundImage: `url(${category.image})`,
                          }}
                        >
                          <Link to={`/category/${category.id}`}>
                            <span>{category.name}</span>
                            <span className={cx('category-number')}>02</span>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={cx('main-posts-wrapper', 'row')}>
              <div className={cx('main-posts-outer', 'col-md-9')}>
                <h3 className={cx('main-posts-title')}>Main posts</h3>
                <div className={cx('main-articles-wrapper', 'row')}>
                  {articles && articles.length > 0 ? (
                    articles.map((article, index) => (
                      <div key={index} className="col-md-4 col-sm-6 col-12 mb-3">
                        <MediaCard article={article} className={cx('article-item')} />
                      </div>
                    ))
                  ) : (
                    <p>Không có bài viết nào</p>
                  )}
                </div>
              </div>
              <div className={cx('about-me-wrapper', 'col-md-3')}>
                <div className={cx('about-me-header')}>
                  <h4>About me</h4>
                </div>
                {currentUser && (
                  <div className={cx('about-item')}>
                    <div className={cx('about-user')}>
                      <div className={cx('about-thumb')}>
                        <Avatar alt="Remy Sharp" src={currentUser?.avatar} />
                      </div>
                      <div className={cx('about-content')}>
                        <h4 className={cx('about-user-title')}>{currentUser?.fullName}</h4>
                        <span>Author</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
