import { Grid } from '@mui/material';
import MediaCard from '../../../../layout/components/MediaCard/MediaCard';
import { Article } from '../../../../model/Article';

type WatchListProps = {
  articles: Article[];
};

function WatchListColumn({ articles }: WatchListProps) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
      {articles &&
        articles.map((article) => (
          <Grid key={article.id} item md={4} xs={6}>
            <MediaCard article={article} />
          </Grid>
        ))}
    </Grid>
  );
}

export default WatchListColumn;
