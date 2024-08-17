import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
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
  error?: string | null;
};

export const initialState: TOrdersData & TUserOrders = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  status: 'loading',
  error: null
};

const ordersInfoSlice = createSlice({
  name: 'ordersInfo',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersInfo.pending, (state) => {
        state.orders = [];
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getOrdersInfo.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.status = 'done';
        }
      )
      .addCase(getOrdersInfo.rejected, (state, action) => {
        state.status = 'done';
        state.error = action.error.message;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.status = 'loading';
        state.userOrders = [];
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.status = 'done';
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = 'done';
        state.error = action.error.message;
      });
  }
});

export default ordersInfoSlice.reducer;
