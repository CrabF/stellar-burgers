import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { UseDispatch, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/feature/ingredientsSlice';

import { AppHeader, BurgerConstructor, BurgerConstructorElement, IngredientsCategory, Modal, OrderInfo, ProtectedRoute } from '@components';
import { AppDispatch } from 'src/services/store';

const App = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(getIngredients())
  }, [dispatch]);
  


  return (
    <>
    <AppHeader />
      <Routes>
        <Route path='/' element={<div className={styles.app}><ConstructorPage /></div>}></Route>
        <Route path='/feed' element={<Feed />}></Route>
        <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>}></Route>
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>}></Route>
        <Route path='/forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>}></Route>
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>}></Route>
        <Route path='*' element={<NotFound404 />}></Route>
        {/* <Route path='/feed/:number' element={<Modal><OrderInfo /></Modal>}></Route>
        <Route path='/ingredients/:id' element={<Modal><IngredientsDetails /></Modal>}></Route>
        <Route path='/profile/orders/:number' element={<Modal><OrderInfo /></Modal>}></Route> */}
      </Routes>
    </>
  );
}
 
export default App;
