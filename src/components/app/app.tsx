import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/IngredientsSlice';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/slices/UserAuthSlice';
import { OnlyAuth, OnlyUnAuth } from '../protectedRoute/protectedRoute';

const App = () => {
  const { error } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  if (error) {
    return <div>Вот такая ошибка от сервера: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title={''}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          }
        >
          {' '}
        </Route>
        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth
              component={
                <Modal title={''}>
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
