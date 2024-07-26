import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader/preloader';
import { Navigate, useLocation } from 'react-router-dom';
import { checkUserAuth } from '../../services/slices/userAuthSlice';
import { getUserApi } from '@api';

type ProtectedRouteProps = {
  children: React.JSX.Element;
}

export const ProtectedRoute = ({children}:ProtectedRouteProps): React.JSX.Element=>{
  const location = useLocation();
  console.log(location, 
    'лока')

  const {isAuthChecked, isAuthenticated, user} = useSelector(state=> state.userAuth);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUserAuth())
  }, [])
  
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate replace to='/login'/>;
  }
  
  return children;
}