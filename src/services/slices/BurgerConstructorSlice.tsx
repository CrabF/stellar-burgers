import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface TburgerConstructorState {
  bun: TBunIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export type TBunIngredient = TIngredient & {
  type: 'bun';
};

export const initialState: TburgerConstructorState = {
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
      state.ingredients = [];
      state.orderModalData = null;
      state.orderRequest = false;
    },
    moveIngredientDown: (state, action) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      const newArrayIngredientds = [...state.ingredients];
      const [removed] = newArrayIngredientds.splice(ingredientIndex, 1);
      newArrayIngredientds.splice(ingredientIndex + 1, 0, removed);
      state.ingredients = newArrayIngredientds;
    },
    moveIngredientUp: (state, action) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );

      const newArrayIngredientds = [...state.ingredients];
      const [removed] = newArrayIngredientds.splice(ingredientIndex, 1);
      newArrayIngredientds.splice(ingredientIndex - 1, 0, removed);
      state.ingredients = newArrayIngredientds;
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
