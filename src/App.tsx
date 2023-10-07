import 'bootstrap/dist/css/bootstrap.min.css';

import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { ReactNode } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import SignUp from './pages/SignUp/SignUp';
import { publicRoutes, privateRoutes } from './routes/routes';
import ThemeProvider from './theme/ThemeProvider';
import SidebarLayout from './admin/layouts/SidebarLayout';
import { useAuth } from './auth/AuthContext';
import { useUser } from './hook';
type LayoutComponent = React.ComponentType<{ children?: ReactNode }>;

function App() {
  const { currentUser } = useUser();
  const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
    if (!currentUser) {
      return <Navigate to="/sign-in" />;
    }
    return children;
  };
  return (
    <Router>
      <ThemeProvider>
        <LocalizationProvider>
          <CssBaseline />

          <div className="App">
            <Routes>
              {publicRoutes.map((route: any, index: number) => {
                let Layout: LayoutComponent = DefaultLayout;
                const Page = route.component;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
              <Route path={'/sign-in'} element={<Login />} />
              <Route path={'/sign-up'} element={<SignUp />} />
              <Route path={'/logout'} element={<Logout />} />
              {privateRoutes.map((route: any, index: number) => {
                let Layout: LayoutComponent = SidebarLayout;
                const Page = route.component;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <Page />
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
