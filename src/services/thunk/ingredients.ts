import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../../utils/constants';

export const fetchIngredients = createAsyncThunk<TIngredient[], void>(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => await getIngredientsApi()
);
