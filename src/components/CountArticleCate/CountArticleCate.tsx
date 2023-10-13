import axios from 'axios';
import styles from '../../pages/Home/Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constant';
import { UtilsFunction } from '../../utils';

const cx = classNames.bind(styles);

function CountArticleCate({ id }: any) {
  const [count, setCount] = useState(0);
  const { handleShowError } = UtilsFunction();

  const formatCount = (count: number) => {
    return count < 10 ? `0${count}` : count.toString();
  };
  useEffect(() => {
    axios
      .get(API_URL + `categories/${id}/articles`)
      .then((res) => setCount(res.data.length))
      .catch((err) => handleShowError('Đã xảy ra lỗi.'));
  }, [id]);
  return <span className={cx('category-number')}>{formatCount(count)}</span>;
}

export default CountArticleCate;
