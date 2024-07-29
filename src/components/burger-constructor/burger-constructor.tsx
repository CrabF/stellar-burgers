import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store'
import { getOrdersApi } from '@api';
import { Navigate, useNavigate } from 'react-router-dom';


export const BurgerConstructor: FC = () => {

  const {ingredients, bun, orderRequest, orderModalData} = useSelector(state => state.burgerConstructor)

  const { user } = useSelector(state => state.userAuth);

  const constructorItems = {
    bun,
    ingredients, 
    orderRequest,
    orderModalData
  };

  // const orderRequest = false;

  // const orderModalData = null;

  const navigate = useNavigate(); 
  
  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      getOrdersApi();
    }
  };


  const closeOrderModal = () => {

  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
