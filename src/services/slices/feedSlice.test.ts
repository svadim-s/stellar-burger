import { RequestStatus } from '@utils-types';
import { feedReducer, initialState } from './feedSlice';
import { fetchFeeds } from '../thunk/feed';

describe('feedSlice', () => {
  it('should set RequestStatus to Loading when fetchFeeds pending', () => {
    const actualState = feedReducer(initialState, fetchFeeds.pending(''));

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Loading
    });
  });

  it('should update state ingredients and set RequestStatus to Success when fetchFeeds success', () => {
    const feedData = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['1', '2'],
          status: 'done',
          name: 'Order 1',
          createdAt: '123',
          updatedAt: '123',
          number: 1
        }
      ],
      total: 100,
      totalToday: 10
    };

    const actualState = feedReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchFeeds.fulfilled(feedData, '')
    );

    expect(actualState).toEqual({
      orders: feedData.orders,
      total: feedData.total,
      totalToday: feedData.totalToday,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed whhen fetchFeeds rejected', () => {
    const error = 'Failed to fetch feeds';
    const actualState = feedReducer(
      initialState,
      fetchFeeds.rejected(new Error(error), '')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Failed
    });
  });
});
