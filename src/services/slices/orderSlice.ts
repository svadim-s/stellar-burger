import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { fetchOrderByNumber, orderBurger } from '../thunk/order';
import { ORDER_SLICE_NAME } from '../../utils/constants';

export interface TOrderState {
  info: TOrder | null;
  status: RequestStatus;
}

const initialState: TOrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: `${ORDER_SLICE_NAME}`,
  initialState,
  reducers: {
    reset: (state: TOrderState) => ({
      ...state,
      info: null
    })
  },
  extraReducers(builder) {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.info = action.payload.order;
        state.status = RequestStatus.Success;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.info = action.payload.orders[0];
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectInfo: (state: TOrderState) => state.info,
    selectStatus: (state: TOrderState) => state.status
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
