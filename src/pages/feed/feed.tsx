import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { feedSelectors } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/thunk/feed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { selectOrders } = feedSelectors;
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
