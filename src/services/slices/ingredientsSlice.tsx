import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api'


interface TIngredientsState {
  ingredients: Array<TIngredient>,
  loading: boolean,
  error: string | null
}

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
      return getIngredientsApi();
   },
); 

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder)=>{
    builder
          .addCase(getIngredients.pending, (state)=>{
            state.loading = true;
            state.error = null
          })
          .addCase(getIngredients.fulfilled, (state, action)=>{
            state.loading = false;
            state.ingredients = action.payload;
          })
          .addCase(getIngredients.rejected, (state, action)=>{
            state.loading = false;
            state.error = 'Error'
          })
  }
})

export default ingredientsSlice.reducer;
