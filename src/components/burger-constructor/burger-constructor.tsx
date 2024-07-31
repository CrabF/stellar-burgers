import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store'
import { orderBurgerApi } from '@api';
import { Link, useNavigate } from 'react-router-dom';
import { addModalData, addOrderRequest, clearConstructor } from '../../services/slices/burgerConstructorSlice';


export const BurgerConstructor: FC = () => {

  const {ingredients, bun, orderRequest, orderModalData} = useSelector(state => state.burgerConstructor)

  const { isAuthenticated } = useSelector(state => state.userAuth);

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

      const ingIDs: string[] = [];
      ingredients.forEach((ingredient)=>{
        ingIDs.push(ingredient._id)
      })

      if(bun) {
        ingIDs.push(bun._id);
        ingIDs.push(bun._id)
      }

      dispatch(addOrderRequest(true));

      orderBurgerApi(ingIDs)
        .then((data)=>{
          if(data.success){
            dispatch(addModalData(data.order))
            dispatch(addOrderRequest(false));
            dispatch(clearConstructor());
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    } else {
      navigate('/login')
    }
  };

  const closeOrderModal = () => {
    navigate('/')
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