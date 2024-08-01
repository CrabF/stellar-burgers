import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersInfo } from '../../services/slices/ordersInfo';

export const Feed: FC = () => {
  const { orders } = useSelector((state) => state.ordersInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersInfo());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
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
