import { rootReducer } from './rootReducer';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { feedReducer } from './slices/feedSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { orderReducer } from './slices/orderSlice';
import { ordersReducer } from './slices/ordersSlice';
import { userReducer } from './slices/userSlice';

describe('rootReducer', () => {
  it('initialize the rootReducer correctly', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      user: userReducer(undefined, { type: '@@INIT' }),
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      burgerConstructor: burgerConstructorReducer(undefined, {
        type: '@@INIT'
      }),
      feed: feedReducer(undefined, { type: '@@INIT' }),
      order: orderReducer(undefined, { type: '@@INIT' }),
      orders: ordersReducer(undefined, { type: '@@INIT' })
    });
  });

  it('handles unknown action correctly', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: burgerConstructorReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      feed: feedReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      order: orderReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});
