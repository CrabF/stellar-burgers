import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userAuthSlice';
import { OnlyAuth, OnlyUnAuth } from '../protectedRoute/protectedRoute';

const App = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getIngredients())
  }, [dispatch]);

  useEffect(()=>{
    dispatch(checkUserAuth())
  }, []);

  return (
    <div className={styles.app}>
    <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />}></Route>
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />}></Route>
        <Route path='/register' element={<OnlyUnAuth component={<Register />} />}></Route>
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />}></OnlyUnAuth>}></Route>
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />}></OnlyUnAuth>}></Route>
        <Route path='/profile' element={<OnlyAuth component={<Profile />}/>}></Route>
        <Route path='/feed' element={<Feed />}></Route>
        <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />}/>}></Route>
        <Route path='*' element={<NotFound404 />}></Route>
        <Route path='/feed/:number' element={<Modal title={''}><OrderInfo /></Modal>}></Route>
        <Route path='/ingredients/:id' element={<Modal title='Детали ингредиента'><IngredientDetails /></Modal>}> </Route>
        <Route path='/profile/orders/:number' element={<Modal title={''}><OrderInfo /></Modal>}></Route>
      </Routes>
      </div>
  );
}
 
export default App;
