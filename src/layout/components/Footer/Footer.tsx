import { useEffect, useState } from 'react';
import { Category } from '../../../model/Category';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { API_URL } from '../../../constant';
import { UtilsFunction } from '../../../utils';
import { RegisterNotification } from '../../../model/RegisterNotification';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Footer() {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
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
            <div className={cx('footer-logo')}></div>
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
      <div className={cx('back-to-top')} style={{ display: 'block' }}>
        <p>Back to top</p>
      </div>
    </>
  );
}

export default Footer;
