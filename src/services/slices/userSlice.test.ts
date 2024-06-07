import { RequestStatus, TUser } from '@utils-types';
import {
  TUserState,
  initialState,
  userActions,
  userReducer
} from './userSlice';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';
import { TLoginData, TRegisterData } from '@api';

describe('userSlice', () => {
  const user: TUser = {
    email: 'testuser@example.com',
    name: 'Test User'
  };

  const loginData: TLoginData = {
    email: 'test@example.com',
    password: 'password'
  };

  const registerData: TRegisterData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123'
  };

  const updatedUser: TRegisterData = {
    email: 'updated@example.com',
    name: 'Updated User',
    password: 'password333'
  };

  it('should set isAuthChecked to true when authCheck action is dispatched', () => {
    const actualState = userReducer(initialState, userActions.authCheck());

    expect(actualState.isAuthChecked).toEqual(true);
  });

  it('should set RequestStatus to Loading when fetchUser pending', () => {
    const actualState = userReducer(initialState, fetchUser.pending(''));

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state user and set RequestStatus to Success when fetchUser fulfilled', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchUser.fulfilled({ success: true, user }, '')
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when fetchUser rejected', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchUser.rejected(new Error('Failed to fetch user'), '')
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Failed
    });
  });

  it('should set RequestStatus to Loading when loginUser pending', () => {
    const actualState = userReducer(
      initialState,
      loginUser.pending('', loginData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state user and set RequestStatus to Success when loginUser fulfilled', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      loginUser.fulfilled(user, '', loginData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when loginUser rejected', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      loginUser.rejected(new Error('Login failed'), '', loginData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Failed
    });
  });

  it('should set RequestStatus to Loading when logoutUser pending', () => {
    const actualState = userReducer(initialState, logoutUser.pending(''));

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state user to null and set RequestStatus to Success when logoutUser fulfilled', () => {
    const stateWithUser: TUserState = {
      ...initialState,
      user,
      status: RequestStatus.Loading
    };

    const actualState = userReducer(
      stateWithUser,
      logoutUser.fulfilled({ success: true }, '')
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when logoutUser rejected', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      logoutUser.rejected(new Error('Logout failed'), '')
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Failed
    });
  });

  it('should set RequestStatus to Loading when registerUser pending', () => {
    const actualState = userReducer(
      initialState,
      registerUser.pending('', registerData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state user and set RequestStatus to Success when registerUser fulfilled', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      registerUser.fulfilled(user, '', registerData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when registerUser rejected', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      registerUser.rejected(new Error('Registration failed'), '', registerData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Failed
    });
  });

  it('should set RequestStatus to Loading when updateUser pending', () => {
    const actualState = userReducer(
      initialState,
      updateUser.pending('', updatedUser)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state user and set RequestStatus to Success when updateUser fulfilled', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      updateUser.fulfilled(updatedUser, '', registerData)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: updatedUser,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when updateUser rejected', () => {
    const actualState = userReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      updateUser.rejected(new Error('Udate User failed'), '', updatedUser)
    );

    expect(actualState).toEqual({
      isAuthChecked: false,
      user: null,
      status: RequestStatus.Failed
    });
  });
});
