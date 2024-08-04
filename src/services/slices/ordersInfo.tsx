import { getFeedsApi, getOrdersApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getOrdersInfo = createAsyncThunk('feed/getOrders', async () =>
  getFeedsApi()
);

export const getUserOrders = createAsyncThunk(
  'profile/getUserOrders',
  async () => getOrdersApi()
);

type TUserOrders = {
  userOrders: TOrder[];
  status: 'loading' | 'done';
};

const initialState: TOrdersData & TUserOrders = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  status: 'loading'
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
      )
      .addCase(getUserOrders.pending, (state, action) => {
        state.status = 'loading';
        state.userOrders = [];
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.status = 'done';
      });
  }
});

export default ordersInfoSlice.reducer;
