import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersInfo } from '../../services/slices/ordersInfo';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isLoading } = useSelector(state=> state.ordersInfo);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrdersInfo())
  }, [dispatch]);

  function updateInfoOrders() {
    dispatch(getOrdersInfo())
  }

  // const orders: TOrder[] = [];

  // if (isLoading) {
  //   return <Preloader />;
  // }
  return (
    <FeedUI orders={orders} handleGetFeeds={updateInfoOrders} />
  )
};
