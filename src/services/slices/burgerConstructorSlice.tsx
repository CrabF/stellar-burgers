import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface TburgerConstructorState {
  bun: TBunIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

type TBunIngredient = TIngredient & {
  type: 'bun';
};

const initialState: TburgerConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      state.ingredients.push(action.payload.ingredient);
    },
    addBun: (state, action) => {
      state.bun = action.payload.ingredient;
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id != action.payload.id
      );
    },
    addOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    addModalData: (state, action) => {
      state.orderModalData = action.payload;
    },
    clearConstructor: (state) => {
      state.bun = null;
      (state.ingredients = []),
        (state.orderModalData = null),
        (state.orderRequest = false);
    },
    moveIngredientDown: (state, action) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      const temp = state.ingredients[ingredientIndex];
      state.ingredients.splice(ingredientIndex, 1);
      state.ingredients.splice(ingredientIndex + 1, 0, temp);
    },
    moveIngredientUp: (state, action) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      const temp = state.ingredients[ingredientIndex];
      state.ingredients.splice(ingredientIndex, 1);
      state.ingredients.splice(ingredientIndex - 1, 0, temp);
    }
  }
});

export const {
  addIngredients,
  addBun,
  deleteIngredient,
  addOrderRequest,
  addModalData,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
