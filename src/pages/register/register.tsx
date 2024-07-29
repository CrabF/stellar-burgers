import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/userAuthSlice';
import { Navigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const {isAuthenticated, user, loginUserRequest} = useSelector(state=>state.userAuth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name:userName, email, password}));
    console.log(user)
  };

  if (loginUserRequest){
    return <Preloader />
  }

  if (isAuthenticated && user) {
    return (
        <Navigate
          to={'/'}
        />
      );
  }



  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};