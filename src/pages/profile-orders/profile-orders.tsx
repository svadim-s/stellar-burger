import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { ordersSelectors } from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/thunk/orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { selectOrders } = ordersSelectors;
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
