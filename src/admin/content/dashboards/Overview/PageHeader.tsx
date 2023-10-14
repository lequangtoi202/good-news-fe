import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../../../../hook';

function PageHeader() {
  const { currentUser } = useUser();
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8),
          }}
          variant="rounded"
          alt={currentUser?.fullName}
          src={currentUser?.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {currentUser?.fullName}!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
