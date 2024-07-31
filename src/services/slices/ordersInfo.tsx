import { getFeedsApi } from "@api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder, TOrdersData } from "@utils-types";

export const getOrdersInfo = createAsyncThunk(
  "feed/getOrders",
  async () =>{
    return getFeedsApi();
  },
);

type TIsLoading ={
  isLoading: boolean
};

const initialState: TOrdersData & TIsLoading = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

const ordersInfoSlice = createSlice({
  name: 'ordersInfo',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersInfo.pending , (state, action) =>{
        state.isLoading = true
      })
      .addCase(getOrdersInfo.fulfilled , (state, action: PayloadAction<TOrdersData>) =>{
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false
      })
  },
})

// export const {  } = ordersInfoSlice.actions;
export default ordersInfoSlice.reducer;