import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { fetchOrders } from '../thunk/orders';
import { ORDERS_SLICE_NAME } from '../../utils/constants';

export interface TOrdersState {
  orders: TOrder[];
  status: RequestStatus;
}

export const initialState: TOrdersState = {
  orders: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: `${ORDERS_SLICE_NAME}`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectOrders: (state: TOrdersState) => state.orders
  }
});

export const ordersActions = ordersSlice.actions;
export const ordersSelectors = ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
