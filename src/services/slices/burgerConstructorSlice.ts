import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface TBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.ingredients.findIndex((item) => item._id === id);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    clear: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index + 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index + 1]
        ];
      }
    }
  },
  selectors: {
    selectConstructorItems: (state: TBurgerConstructorState) => state
  }
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorSelectors = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
