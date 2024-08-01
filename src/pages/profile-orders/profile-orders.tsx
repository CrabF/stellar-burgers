import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getOrdersInfo, getUserOrders } from '../../services/slices/ordersInfo';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.ordersInfo);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  useEffect(() => {
    dispatch(getOrdersInfo());
  }, []);

  if (!userOrders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
