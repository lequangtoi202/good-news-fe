import { Card } from '@mui/material';
import RecentBookmarksTable from './RecentBookmarksTable';
import { useEffect, useState } from 'react';
import { Bookmark } from '../../../../model/Bookmark';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import axios from 'axios';
import { API_URL } from '../../../../constant';

function RecentBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    axios
      .get(API_URL + 'bookmarks?pageSize=6&pageNumber=0')
      .then((res) => setBookmarks(res.data.content))
      .catch((err) => console.log(err));
  }, [admin]);
  return (
    <Card>
      <RecentBookmarksTable bookmarks={bookmarks} />
    </Card>
  );
}

export default RecentBookmarks;
