import { RequestStatus, TOrder } from '@utils-types';
import { TOrdersState, ordersReducer } from './ordersSlice';
import { fetchOrders } from '../thunk/orders';

describe('ordersSlice', () => {
  const initialState: TOrdersState = {
    orders: [],
    status: RequestStatus.Idle
  };

  it('should set RequestStatus to Loading when fetchOrders pending', () => {
    const actualState = ordersReducer(initialState, fetchOrders.pending(''));

    expect(actualState).toEqual({
      orders: [],
      status: RequestStatus.Loading
    });
  });

  it('should update state orders and set RequestStatus to Success when fetchOrders success', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Order 1',
        createdAt: '123',
        updatedAt: '123',
        number: 1
      }
    ];

    const actualState = ordersReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchOrders.fulfilled(orders, '')
    );

    expect(actualState).toEqual({
      orders: orders,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed when fetchOrders rejected', () => {
    const error = 'Failed to fetch orders';
    const actualState = ordersReducer(
      initialState,
      fetchOrders.rejected(new Error(error), '')
    );

    expect(actualState).toEqual({
      orders: [],
      status: RequestStatus.Failed
    });
  });
});
