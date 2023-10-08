import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Card, Grid, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Cookies from 'universal-cookie';
import { API_URL } from '../../../../constant';
import { CategoryArticleStat } from '../../../../model/CategoryArticleStats';
import { UserStatisticResponse } from '../../../../model/UserStatisticResponse';
import { UtilsFunction } from '../../../../utils';

function UserStatistic() {
  const theme = useTheme();
  const cookies = new Cookies();
  const { handleShowError } = UtilsFunction();
  const token = cookies.get('accessToken');
  const [userStatistics, setUserStatistics] = useState<UserStatisticResponse[]>([]);
  const [categoryArticleStats, setCategoryArticleStats] = useState<CategoryArticleStat[]>([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalArticle, setTotalArticle] = useState(0);
  useEffect(() => {
    axios
      .get(API_URL + `statistic/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json',
        },
      })
      .then((res) => {
        setUserStatistics(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axios
      .get(API_URL + `statistic/article-category`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json',
        },
      })
      .then((res) => {
        setCategoryArticleStats(res.data);
      })
      .catch((err) => {
        handleShowError('Đã xảy ra lỗi!');
      });
    axios
      .get(API_URL + `statistic/count-all-articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json',
        },
      })
      .then((res) => {
        setTotalArticle(res.data);
      })
      .catch((err) => {
        handleShowError('Đã xảy ra lỗi!');
      });
    axios
      .get(API_URL + `statistic/count-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json',
        },
      })
      .then((res) => {
        setTotalUser(res.data);
      })
      .catch((err) => {
        handleShowError('Đã xảy ra lỗi!');
      });
  }, []);
  const labelList = userStatistics.map((userStatistic) => userStatistic.roleName);
  const value = userStatistics.map((userStatistic) => userStatistic.user);
  const labelArticleList = categoryArticleStats.map((cateArt) => cateArt.categoryName);
  const quantity = categoryArticleStats.map((cateArt) => cateArt.quantity);
  const chartOptionsUser: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    colors: ['#ff9900', '#1c81c2', '#333'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (typeof val === 'number') {
          return val.toFixed(2) + '%';
        }
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]],
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: labelList,
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };
  const chartSeriesUser = value;

  const chartOptionsArticle: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    colors: ['#ff9900', '#1c81c2', '#1f31b2', '#7f31b2', '#5f3fb2', '#2f90b2', '#6d68b2', '#9f11b2', '#1ee1b2'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        if (typeof val === 'number') {
          return val.toFixed(2) + '%';
        }
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]],
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: labelArticleList,
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };
  const chartSeriesArticle = quantity;

  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body" style={{ padding: '1.25rem' }}>
              <div className="row align-items-center">
                <div className="col" style={{ marginRight: '0.5rem !important' }}>
                  <div className="font-weight-bold text-primary text-uppercase mb-1" style={{ fontSize: '0.8rem' }}>
                    Total users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{totalUser}</div>
                </div>
                <div className="col-auto">
                  <PersonIcon sx={{ fontSize: 36 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body" style={{ padding: '1.25rem' }}>
              <div className="row align-items-center">
                <div className="col" style={{ marginRight: '0.5rem !important' }}>
                  <div className="font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '0.8rem' }}>
                    Total articles
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{totalArticle}</div>
                </div>
                <div className="col-auto">
                  <NewspaperIcon sx={{ fontSize: 36 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <Grid spacing={0} container>
          <Grid
            sx={{
              position: 'relative',
            }}
            display="flex"
            alignItems="center"
            item
            xs={12}
            md={12}
          >
            <Box py={4} pr={4} flex={1}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={6} item display="flex" justifyContent="center" alignItems="center">
                  <Chart height={250} options={chartOptionsUser} series={chartSeriesUser} type="donut" />
                </Grid>
                <Grid xs={12} sm={6} item display="flex" alignItems="center">
                  <Grid xs={12} sm={6} item display="flex" alignItems="center">
                    <List
                      disablePadding
                      sx={{
                        width: '100%',
                      }}
                    >
                      {userStatistics &&
                        userStatistics.map((stat, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemText
                              primary={stat.roleName}
                              primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                              secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true,
                              }}
                            />
                            <Box>
                              <Typography align="right" variant="h4" noWrap>
                                {stat.user}
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            sx={{
              position: 'relative',
            }}
            display="flex"
            alignItems="center"
            item
            xs={12}
            md={12}
          >
            <Box py={4} pr={4} flex={1}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={6} item display="flex" justifyContent="center" alignItems="center">
                  <Chart height={250} options={chartOptionsArticle} series={chartSeriesArticle} type="donut" />
                </Grid>
                <Grid xs={12} sm={6} item display="flex" alignItems="center">
                  <Grid xs={12} sm={6} item display="flex" alignItems="center">
                    <List
                      disablePadding
                      sx={{
                        width: '100%',
                      }}
                    >
                      {categoryArticleStats &&
                        categoryArticleStats.map((stat, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemText
                              primary={stat.categoryName}
                              primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                              secondaryTypographyProps={{
                                variant: 'subtitle2',
                                noWrap: true,
                              }}
                            />
                            <Box>
                              <Typography align="right" variant="h4" noWrap>
                                {stat.quantity}
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default UserStatistic;
