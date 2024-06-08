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
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  [userSlice.name]: userReducer,
  [ingredientsSlice.name]: ingredientsReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer,
  [feedSlice.name]: feedReducer,
  [orderSlice.name]: orderReducer,
  [ordersSlice.name]: ordersReducer
});
