import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Container, Grid } from '@mui/material';

import WatchList from './WatchList';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import Footer from '../../../../components/Footer';
import UserStatistic from './UserStatistic';
import Hot from './Hot';

function DashboardOverview() {
  return (
    <>
      <Helmet>
        <title>Overview</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
          <Grid item xs={12}>
            <UserStatistic />
          </Grid>
          <Grid item xs={12}>
            <Hot />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardOverview;
