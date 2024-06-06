import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunk/ingredients';
import { INGREDIENTS_SLICE_NAME } from '../../utils/constants';

export interface TIngredientsState {
  ingredients: TIngredient[] | null;
  status: RequestStatus;
}

const initialState: TIngredientsState = {
  ingredients: null,
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: `${INGREDIENTS_SLICE_NAME}`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const getIngredients = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.ingredients;
export const getIngredientById = (
  state: { ingredients: TIngredientsState },
  id: string
) =>
  state.ingredients.ingredients?.find((ingredient) => ingredient._id === id) ||
  null;
export const getIngredientsStatus = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.status;

export const ingredientsReducer = ingredientsSlice.reducer;

export const ingredientsSelectors = {
  getIngredients,
  getIngredientById,
  getIngredientsStatus
};
