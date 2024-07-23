import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

interface TburgerConstructorState {
  bun: {
    price: number
  },
  ingredients: TIngredient[],
  orderRequest: boolean,
  orderModalData: {
    number: number
  }
}

const initialState: TburgerConstructorState = {
  bun: {
    price: 0
  },
  ingredients: [],
  orderRequest: false,
  orderModalData: {
    number: 0
  }
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action)=>{
      state.ingredients.push(action.payload)
    }
  }
})

export const { addIngredients } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

