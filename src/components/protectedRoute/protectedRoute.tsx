import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader/preloader';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkUserAuth } from '../../services/slices/userAuthSlice';
import { getUserApi } from '@api';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean,
  component: React.JSX.Element;
}

export const ProtectedRoute = ({onlyUnAuth = false, component}:ProtectedRouteProps): React.JSX.Element=>{
  const location = useLocation();

  const {isAuthChecked, isAuthenticated, user} = useSelector(state=> state.userAuth);
  // console.log(user)

  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(checkUserAuth())
  // }, [dispatch])
  
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if(onlyUnAuth && user){
    const { from } = location.state ?? {from: {pathname: '/'}};
    return <Navigate to= {from} />
  }

  if(!onlyUnAuth && !user){
    return <Navigate to='/login' state={{from: location}} />
  }

  // if(onlyUnAuth && !user){

  // }

  // if (user === null) {
  //   return <Navigate to='/login'/>;
  // }
  
  
  return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element=>{
  return <ProtectedRoute onlyUnAuth={true} component={component} />
}