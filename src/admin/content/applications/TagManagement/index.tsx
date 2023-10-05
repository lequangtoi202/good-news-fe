import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';

import Footer from '../../../../components/Footer';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import RecentTags from './RecentTags';

function ApplicationsTagManagement() {
  return (
    <>
      <Helmet>
        <title>Tag Management - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentTags />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTagManagement;
