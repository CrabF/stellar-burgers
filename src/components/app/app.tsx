import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';

import { AppHeader, BurgerConstructor, BurgerConstructorElement, IngredientDetails, IngredientsCategory, Modal, OrderInfo, ProtectedRoute } from '@components';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userAuthSlice';

const App = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getIngredients())
  }, [dispatch]);

  useEffect(()=>{
    dispatch(checkUserAuth())
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
        <Route path='/feed/:number' element={<Modal title={''}><OrderInfo /></Modal>}></Route>
        <Route path='/ingredients/:id' element={<Modal title='Детали ингредиента'><IngredientDetails /></Modal>}> </Route>
        <Route path='/profile/orders/:number' element={<Modal title={''}><OrderInfo /></Modal>}></Route>
      </Routes>
    </>
  );
}
 
export default App;
