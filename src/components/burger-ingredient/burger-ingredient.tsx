import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
  addIngredients,
  addBun
} from '../../services/slices/burgerConstructorSlice';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      const constructorIngredient: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };

      dispatch(() => {
        if (ingredient.type === 'bun') {
          dispatch(addBun({ ingredient }));
        } else {
          dispatch(addIngredients({ ingredient: constructorIngredient }));
        }
      });
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
