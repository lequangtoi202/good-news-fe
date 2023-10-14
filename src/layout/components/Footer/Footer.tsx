import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Fab } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollTop from '../../../components/ScrollTop/ScrollTop';
import { API_URL } from '../../../constant';
import { Category } from '../../../model/Category';
import { RegisterNotification } from '../../../model/RegisterNotification';
import { UtilsFunction } from '../../../utils';
import styles from './Footer.module.scss';
import images from '../../../assets/images';

const cx = classNames.bind(styles);
function Footer({ props }: any) {
  const { handleShowError, handleShowSuccess } = UtilsFunction();
  const [categories, setCategories] = useState<Category[]>([]);
  const [registerNotification, setRegisterNotification] = useState<RegisterNotification>({
    name: '',
    email: '',
  });
  const totalCategories = categories.length;
  const categoriesPerColumn = Math.ceil(totalCategories / 3);
  const column1 = categories.slice(0, categoriesPerColumn);
  const column2 = categories.slice(categoriesPerColumn, categoriesPerColumn * 2);
  const column3 = categories.slice(categoriesPerColumn * 2);
  useEffect(() => {
    axios
      .get(API_URL + 'categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        handleShowError('Đã có lỗi xảy ra');
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterNotification({
      ...registerNotification,
      [name]: value,
    });
  };

  const clearInputData = () => {
    setRegisterNotification({
      name: '',
      email: '',
    });
  };

  const handleSubmitRegisterReceiveNotification = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(API_URL + 'users/register-receive-notification', JSON.stringify(registerNotification), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        clearInputData();
      })
      .catch((error) => {
        handleShowError('Đã có lỗi xảy ra');
        clearInputData();
      });
  };

  const handleScrollToTop = () => {
    const topElement = document.getElementById('top');
    console.log(topElement);
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <footer className={cx('footer')}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className={cx('footer-widgets')}>
                    <div className={cx('footer-title')}>
                      <h3 className={cx('cate-title')}>Chủ đề</h3>
                    </div>
                    <div className="container">
                      <div className={cx('footer-menu-list', 'row')}>
                        <ul className="col-md-6 col-lg-4 col-sm-4 col-6">
                          {column1.map((category) => (
                            <li key={category.id}>
                              <Link to={`/category/${category.id}`}>{category.name}</Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="col-md-6 col-lg-4 col-sm-4 col-6">
                          {column2.map((category) => (
                            <li key={category.id}>
                              <Link to={`/category/${category.id}`}>{category.name}</Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="col-md-6 col-lg-4 col-sm-4 col-6">
                          {column3.map((category) => (
                            <li key={category.id}>
                              <Link to={`/category/${category.id}`}>{category.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className={cx('footer-widgets')}>
                    <div className={cx('footer-title')}>
                      <h3 className={cx('cate-title')}>Bản tin</h3>
                    </div>
                    <div className={cx('footer-widget-form')}>
                      <form onSubmit={handleSubmitRegisterReceiveNotification}>
                        <div className={cx('input-box')}>
                          <i className="far fa-user"></i>
                          <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={registerNotification.name}
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className={cx('input-box')}>
                          <i className="far fa-envelope"></i>
                          <input
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            value={registerNotification.email}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className={cx('input-box')}>
                          <button type="submit">
                            <i className="far fa-paper-plane"></i>
                            Đăng ký ngay
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('footer-logo', 'col-lg-3')}>
              <Avatar src={images.logo} sx={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </footer>
      <div className={cx('copyright-area')}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className={cx('copyright-text')}>
                <p>
                  Copyright By@<span>GoodNews</span> - 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{ backgroundColor: '#f63a3a', color: '#fff', '&:hover': { backgroundColor: '#df3535', color: '#fff' } }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Footer;
