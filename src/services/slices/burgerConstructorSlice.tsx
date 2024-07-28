import { createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient, TOrder } from "@utils-types";

interface TburgerConstructorState {
  bun: TBunIngredient | null,
  ingredients: TConstructorIngredient[],
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
        state.ingredients.push(action.payload.ingredient);
    },
    addBun: (state, action)=>{
      state.bun = action.payload.ingredient;
    },
    deleteIngredient: (state, action)=>{
      state.ingredients = state.ingredients.filter((item)=>{
        return item.id != action.payload.id
      })
    }
  }
})

export const { addIngredients, addBun, deleteIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

