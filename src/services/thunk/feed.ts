import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../../utils/constants';

export const fetchFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchFeeds`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
