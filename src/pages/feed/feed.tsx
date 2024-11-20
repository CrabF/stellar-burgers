import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersInfo } from '../../services/slices/OrdersInfoSlice';

export const Feed: FC = () => {
  const { orders, status, error } = useSelector((state) => state.ordersInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersInfo());
  }, []);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (error) {
    return <div>Вот такая ошибка от сервера: {error}</div>;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getOrdersInfo());
      }}
    />
  );
};
