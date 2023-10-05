import { Breadcrumbs, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { API_URL } from '../../constant';
import { Article } from '../../model/Article';
import { Category } from '../../model/Category';
import { UtilsFunction } from '../../utils';
import styles from './Category.module.scss';
import { TagModel } from '../../model/TagModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const cx = classNames.bind(styles);

function CategoryComp() {
  const error = useSelector((state: RootState) => state.error);
  const { handleShowError } = UtilsFunction();
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<{ [key: string]: Article[] }>({}); // Đảm bảo bạn đã định nghĩa kiểu dữ liệu Article
  const [tags, setTags] = useState<TagModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(API_URL + 'categories');
        const fetchedCategories = categoriesResponse.data;
        setCategories(fetchedCategories);
        const articlesByCategory: { [key: string]: Article[] } = {};

        for (const category of fetchedCategories) {
          const articleResponse = await axios.get(API_URL + `categories/${category.id}/articles`);
          const fetchedArticles = articleResponse.data;
          articlesByCategory[category.name] = fetchedArticles;
        }
        setArticles(articlesByCategory);

        const tagsResponse = await axios.get(API_URL + 'tags');
        setTags(tagsResponse.data);
      } catch (error) {
        handleShowError('Đã có lỗi xảy ra khi lấy dữ liệu.');
      }
    };

    fetchData();
  }, []);
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
                    <Link to="/" style={{ color: 'blue' }}>
                      Trang chủ
                    </Link>
                    <Typography color="text.primary">Chủ đề</Typography>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('category-wrapper')}>
          <div className={cx('tags-area')}>
            <div className={cx('tags-wrapper')}>
              {tags &&
                tags.map((tag) => (
                  <span key={tag.id} className={cx('tags-item')}>
                    <Link to={`/tag/${tag.id}`}># {tag.name}</Link>
                  </span>
                ))}
            </div>
          </div>
          <div className={cx('category-outer', 'row')}>
            {categories &&
              categories.length > 0 &&
              categories.map((cate) => {
                const categoryArticles = articles[cate.name];
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

export default CategoryComp;
