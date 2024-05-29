import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';
import { USER_SLICE_NAME } from '../../utils/constants';

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  status: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  status: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: `${USER_SLICE_NAME}`,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = RequestStatus.Success;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getUser: (state: TUserState) => state.user,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export const userReducer = userSlice.reducer;
