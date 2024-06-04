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
  },
  selectors: {
    getIngredients: (state: TIngredientsState) => state.ingredients,
    getIngredientById: (state: TIngredientsState, id: string) => {
      state.ingredients?.find((ingredient) => ingredient._id === id) || null;
    },
    getIngredientsStatus: (state: TIngredientsState) => state.status
  }
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
