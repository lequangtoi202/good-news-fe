import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Modal, Paper } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import images from '../../../assets/images';
import { useAuth } from '../../../auth/AuthContext';
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor';
import Search from '../../../components/Search';
import { API_URL } from '../../../constant';
import { Author } from '../../../model/Author';
import { RootState } from '../../../redux/store';
import { UtilsFunction } from '../../../utils';
import { useUser } from '../../../hook';

const pages = [
  { page: 'Trang chủ', path: '/' },
  { page: 'Chủ đề', path: '/category' },
];

type Setting = {
  page: string;
  path: string;
};

function Navbar() {
  const { currentUser } = useUser();
  const [authorMe, setAuthorMe] = useState<Author | null>(null);
  const cookies = new Cookies();
  const { handleShowError } = UtilsFunction();
  const token = cookies.get('accessToken');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialSettings: Setting[] = [];
  const settings: Setting[] = currentUser
    ? [
        ...initialSettings,
        { page: 'Tài khoản', path: '/account' },
        { page: 'Đăng xuất', path: '/logout' },
        { page: 'Bookmark', path: '/bookmark' },
        { page: 'Đăng ký viết bài', path: '/request-author' },
      ]
    : [...initialSettings, { page: 'Đăng nhập', path: '/sign-in' }, { page: 'Đăng ký', path: '/sign-up' }];
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarHeight = navbarRef.current.clientHeight;

        if (window.scrollY > navbarHeight) {
          setIsNavbarFixed(true);
        } else {
          setIsNavbarFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    if (token) {
      axios
        .get(API_URL + 'authors/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAuthorMe(response.data);
        })
        .catch(() => {
          handleShowError('Đã xảy ra lỗi!');
        });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <AppBar
        ref={navbarRef}
        style={{ transition: 'all 0.3s ease' }}
        position={isNavbarFixed === true ? 'fixed' : 'static'}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h3"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: '24px',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link style={{ color: 'white' }} to={'/'}>
                <Avatar style={{ width: '130px', height: '80px' }} src={images.logo} />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" variant="h6" sx={{ fontSize: '16px' }}>
                      <Link to={page.path}>{page.page}</Link>
                    </Typography>
                  </MenuItem>
                ))}
                {authorMe && (
                  <MenuItem onClick={handleShowModal}>
                    <Typography textAlign="center" variant="h6" sx={{ fontSize: '14px', color: '#000' }}>
                      <div>Viết bài</div>
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h3"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                fontSize: '12px',
                textDecoration: 'none',
              }}
            >
              <Link style={{ color: 'white' }} to={'/'}>
                <Avatar style={{ width: '120px', height: '60px' }} src={images.logo} />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px' }}
                >
                  <Link style={{ color: 'white' }} to={page.path}>
                    {page.page}
                  </Link>
                </Button>
              ))}
            </Box>
            <Search />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Quang" src={currentUser?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" variant="h6" sx={{ fontSize: '14px' }}>
                      <Link to={setting.path}>{setting.page}</Link>
                    </Typography>
                  </MenuItem>
                ))}
                {authorMe && (
                  <MenuItem onClick={handleShowModal}>
                    <Typography textAlign="center" variant="h6" sx={{ fontSize: '14px', color: '#000' }}>
                      <div>Viết bài</div>
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="write-article-modal"
              aria-describedby="write-article-modal-description"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Paper sx={{ padding: 2, width: '80%', maxWidth: 800, height: '80%' }}>
                <ArticleEditor />
              </Paper>
            </Modal>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
