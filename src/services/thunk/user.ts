import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';
import { USER_SLICE_NAME } from '../../utils/constants';

export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/checkUserAuth`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/login`,
  async (userData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  `${USER_SLICE_NAME}/register`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<TUser, TRegisterData>(
  `${USER_SLICE_NAME}/update`,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
