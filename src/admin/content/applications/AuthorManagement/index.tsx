import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Grid, Container } from '@mui/material';
import PageTitleWrapper from '../../../../components/PageTitleWrapper';
import Footer from '../../../../components/Footer';
import RecentAuthors from './RecentAuthors';

function ApplicationsAuthorManagement() {
  return (
    <>
      <Helmet>
        <title>Author Management - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentAuthors />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsAuthorManagement;
