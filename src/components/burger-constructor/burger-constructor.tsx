import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store'
import { getOrdersApi, refreshToken } from '@api';
import { Navigate, useNavigate } from 'react-router-dom';
import { checkUserAuth } from '../../services/slices/userAuthSlice';


export const BurgerConstructor: FC = () => {

  const {ingredients, bun, orderRequest, orderModalData} = useSelector(state => state.burgerConstructor)

  const { user, isAuthChecked, isAuthenticated } = useSelector(state => state.userAuth);

  const dispatch = useDispatch();
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
    if(isAuthenticated){
      getOrdersApi()
    } else {
      navigate('/login')
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
