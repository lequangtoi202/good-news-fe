import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Categories Management
        </Typography>
        <Typography variant="subtitle2">{user.name}, these are your recent users</Typography>
      </Grid>
      <Grid item>
        <Link to={'/admin/management/categories/add'}>
          <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />}>
            Create category
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
