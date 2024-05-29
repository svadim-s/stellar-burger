import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructorSlice';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../services/slices/userSlice';
import { orderBurger } from '../../services/thunk/order';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(
    burgerConstructorSelectors.selectConstructorItems
  );
  const { selectInfo, selectStatus } = orderSelectors;
  const { getUser } = userSelectors;
  const user = useSelector(getUser);
  const status = useSelector(selectStatus);

  const orderRequest = status === 'Loading';
  const orderModalData = useSelector(selectInfo);

  const onOrderClick = async () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    await dispatch(orderBurger(ingredientIds));
  };

  const closeOrderModal = async () => {
    await dispatch(burgerConstructorActions.clear());
    await dispatch(orderActions.reset());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
