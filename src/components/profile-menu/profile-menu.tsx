import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { updateUserInfo } from '../../services/slices/UserAuthSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      logoutApi().then(() => {
        deleteCookie('accessToken');
        localStorage.clear();
        dispatch(updateUserInfo(null));
        navigate('/');
      });
    } catch (error) {
      console.error('Failed to logout user', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
