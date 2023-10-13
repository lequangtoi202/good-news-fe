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
    document.cookie = name + '=; Max-Age=-99999999;';
  };

  useEffect(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    setCurrentUser(null);
    dispatch(logout());

    navigate('/', { replace: true });
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
