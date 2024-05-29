import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../utils/constants';

export const orderBurger = createAsyncThunk(
  `${ORDER_SLICE_NAME}/orderBurger`,
  async (orderData: string[]) => await orderBurgerApi(orderData)
);

export const fetchOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrderByNumber`,
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
