import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  TError,
  isUserAuthenticated,
  setLoginError,
  setUserInfo
} from '../../services/slices/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from '@api';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUserError } = useSelector((state) => state.userAuth);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    loginUserApi({ email, password })
      .then((data) => {
        dispatch(setUserInfo(data.user));
        dispatch(isUserAuthenticated(true));
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/');
      })
      .catch((error: TError) => {
        dispatch(setLoginError(error.message));
      });
  };

  return (
    <LoginUI
      errorText={loginUserError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
