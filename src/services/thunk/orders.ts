import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDERS_SLICE_NAME } from '../../utils/constants';

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  `${ORDERS_SLICE_NAME}/fetchOrders`,
  async () => await getOrdersApi()
);
