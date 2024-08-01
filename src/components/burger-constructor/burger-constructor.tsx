import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurgerApi, refreshToken } from '@api';
import { useNavigate } from 'react-router-dom';
import {
  addModalData,
  addOrderRequest,
  clearConstructor
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const { ingredients, bun, orderRequest, orderModalData } = useSelector(
    (state) => state.burgerConstructor
  );

  const { isAuthenticated } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();
  const constructorItems = {
    bun,
    ingredients,
    orderRequest,
    orderModalData
  };

  const navigate = useNavigate();

  const onOrderClick = () => {
    if (isAuthenticated) {
      const ingIDs: string[] = [];
      ingredients.forEach((ingredient) => {
        ingIDs.push(ingredient._id);
      });

      if (bun) {
        ingIDs.push(bun._id);
        ingIDs.push(bun._id);
      }

      dispatch(addOrderRequest(true));
      refreshToken()
        .then(() => {
          orderBurgerApi(ingIDs)
            .then((data) => {
              dispatch(addModalData(data.order));
              dispatch(addOrderRequest(false));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    navigate('/');
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
