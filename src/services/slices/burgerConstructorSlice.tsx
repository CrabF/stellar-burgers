import { createSlice } from "@reduxjs/toolkit";
import { TIngredient, TOrder } from "@utils-types";

interface TburgerConstructorState {
  bun: TBunIngredient | null,
  ingredients: TIngredient[],
  orderRequest: boolean,
  orderModalData: TOrder | null
}

type TBunIngredient = TIngredient & {
  type: 'bun';
};

const initialState: TburgerConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action)=>{
      state.ingredients.push(action.payload.ingredient)
    },
    addBun: (state, action)=>{
      state.bun = action.payload.ingredient
    }
  }
})

export const { addIngredients, addBun } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

