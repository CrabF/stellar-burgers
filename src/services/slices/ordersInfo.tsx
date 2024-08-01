import { getFeedsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getOrdersInfo = createAsyncThunk('feed/getOrders', async () =>
  getFeedsApi()
);

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

const ordersInfoSlice = createSlice({
  name: 'ordersInfo',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersInfo.pending, (state, action) => {
        state.orders = [];
      })
      .addCase(
        getOrdersInfo.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  }
});

export default ordersInfoSlice.reducer;
