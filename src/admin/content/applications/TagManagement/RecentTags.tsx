import { Card } from '@mui/material';
import RecentTagsTable from './RecentTagsTable';
import axios from 'axios';
import { TagModel } from '../../../../model/TagModel';
import { API_URL } from '../../../../constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

function RecentTags() {
  const [tags, setTags] = useState<TagModel[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    axios
      .get(API_URL + 'tags?pageSize=6&pageNumber=0')
      .then((res) => setTags(res.data.content))
      .catch((err) => console.log(err));
  }, [admin]);
  return (
    <Card>
      <RecentTagsTable tags={tags} />
    </Card>
  );
}

export default RecentTags;
