import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersInfo } from '../../services/slices/ordersInfo';

export const Feed: FC = () => {
  const { orders } = useSelector(state=> state.ordersInfo);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrdersInfo())
  }, [dispatch]);

  function updateInfoOrders() {
    dispatch(getOrdersInfo())
  }

  if (!orders.length) {
    return <div><Preloader /></div>
  }
 
   return <div><FeedUI orders={orders} handleGetFeeds={updateInfoOrders} /></div>
  
};
