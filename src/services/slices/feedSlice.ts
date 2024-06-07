import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { fetchFeeds } from '../thunk/feed';
import { FEED_SLICE_NAME } from '../../utils/constants';

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: `${FEED_SLICE_NAME}`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload?.orders ?? [];
        state.total = action.payload?.total ?? 0;
        state.totalToday = action.payload?.totalToday ?? 0;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectOrders: (state: TFeedState) => state.orders,
    selectTotal: (state: TFeedState) => state.total,
    selectTotalToday: (state: TFeedState) => state.totalToday
  }
});

export const feedActions = feedSlice.actions;
export const feedSelectors = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
