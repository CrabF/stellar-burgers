import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  getOrdersInfo,
  getUserOrders
} from '../../services/slices/OrdersInfoSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders, status, error } = useSelector(
    (state) => state.ordersInfo
  );

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  useEffect(() => {
    dispatch(getOrdersInfo());
  }, []);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (!userOrders.length && status === 'done') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '52%',
          left: '38%',
          fontSize: '34px'
        }}
      >
        У вас не было заказов
      </div>
    );
  }

  if (error) {
    return <div>Вот такая ошибка от сервера: {error}</div>;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
