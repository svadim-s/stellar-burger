import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userReducer, userSlice } from './slices/userSlice';
import {
  ingredientsReducer,
  ingredientsSlice
} from './slices/ingredientsSlice';
import {
  burgerConstructorReducer,
  burgerConstructorSlice
} from './slices/burgerConstructorSlice';
import { feedReducer, feedSlice } from './slices/feedSlice';
import { orderReducer, orderSlice } from './slices/orderSlice';
import { ordersReducer, ordersSlice } from './slices/ordersSlice';

const rootReducer = combineReducers({
  [userSlice.name]: userReducer,
  [ingredientsSlice.name]: ingredientsReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer,
  [feedSlice.name]: feedReducer,
  [orderSlice.name]: orderReducer,
  [ordersSlice.name]: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
