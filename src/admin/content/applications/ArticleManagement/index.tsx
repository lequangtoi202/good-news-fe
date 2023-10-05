import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Grid, Container } from '@mui/material';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import Footer from '../../../../components/Footer';
import RecentArticles from './RecentArticles';

function ApplicationsArticleManagement() {
  return (
    <>
      <Helmet>
        <title>Article Management - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentArticles />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsArticleManagement;
