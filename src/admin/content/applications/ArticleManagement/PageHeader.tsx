import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Articles Management
        </Typography>
      </Grid>
      <Grid item>
        <Link to={'/admin/management/articles/crawl-data'}>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            style={{ marginRight: '4px' }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Craw data
          </Button>
        </Link>
        <Link to={'/admin/management/articles/add'}>
          <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />}>
            Create article
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
