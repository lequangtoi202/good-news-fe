import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userReducer';
import { useUser } from '../../hook';

function Logout() {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  useEffect(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('user');
    setCurrentUser(null);
    dispatch(logout());

    navigate('/', { replace: true });
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
