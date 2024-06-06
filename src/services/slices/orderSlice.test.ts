import { RequestStatus, TOrder } from '@utils-types';
import { TOrderState, orderActions, orderReducer } from './orderSlice';
import { fetchOrderByNumber, orderBurger } from '../thunk/order';

describe('orderSlice', () => {
  const initialState: TOrderState = {
    info: null,
    status: RequestStatus.Idle
  };

  it('should set RequestStatus to Loading when orderBurger pending', () => {
    const actualState = orderReducer(initialState, orderBurger.pending('', []));
    expect(actualState).toEqual({
      info: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state info and set RequestStatus to Success when orderBurger fulfilled', () => {
    const order: TOrder = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Order 1',
      createdAt: '123',
      updatedAt: '123',
      number: 1
    };

    const actualState = orderReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      orderBurger.fulfilled({ order, name: '', success: true }, '', [])
    );

    expect(actualState).toEqual({
      info: order,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when orderBurger rejected', () => {
    const error = 'Failed to order burger';
    const actualState = orderReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      orderBurger.rejected(new Error(error), '', [])
    );

    expect(actualState).toEqual({
      info: null,
      status: RequestStatus.Failed
    });
  });

  it('should set RequestStatus to Loading when fetchOrderByNumber pending', () => {
    const actualState = orderReducer(
      initialState,
      fetchOrderByNumber.pending('', 0)
    );

    expect(actualState).toEqual({
      info: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state info and set RequestStatus to Success when fetchOrderByNumber fulfilled', () => {
    const order: TOrder = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Order 1',
      createdAt: '123',
      updatedAt: '123',
      number: 1
    };

    const actualState = orderReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchOrderByNumber.fulfilled({ orders: [order], success: true }, '', 0)
    );

    expect(actualState).toEqual({
      info: order,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when fetchOrderByNumber rejected', () => {
    const error = 'Failed to fetch order by number';
    const actualState = orderReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchOrderByNumber.rejected(new Error(error), '', 0)
    );

    expect(actualState).toEqual({
      info: null,
      status: RequestStatus.Failed
    });
  });

  it('should reset state info when reset action is dispatched', () => {
    const initialStateInfo: TOrderState = {
      info: {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Order 1',
        createdAt: '123',
        updatedAt: '123',
        number: 1
      },
      status: RequestStatus.Idle
    };

    const actualState = orderReducer(initialStateInfo, orderActions.reset());

    expect(actualState).toEqual({
      info: null,
      status: RequestStatus.Idle
    });
  });
});
