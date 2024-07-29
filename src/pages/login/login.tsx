import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userAuthSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const {user, isAuthChecked} = useSelector(state => state.userAuth)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(checkUserAuth());
  };


  if(user){
    navigate('/');
  } else {
    console.log('хз')
    console.log(isAuthChecked)
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
