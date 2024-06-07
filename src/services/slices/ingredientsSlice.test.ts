import { RequestStatus, TIngredient } from '@utils-types';
import { ingredientsReducer, initialState } from './ingredientsSlice';
import { fetchIngredients } from '../thunk/ingredients';

describe('ingredientsSlice', () => {
  it('should set RequestStatus to Loading when fetchIngredients pending', () => {
    const actualState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );

    expect(actualState).toEqual({
      ingredients: null,
      status: RequestStatus.Loading
    });
  });

  it('should update state ingredients and set RequestStatus to Success when fetchIngredients success', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'type1',
        proteins: 2,
        fat: 1,
        carbohydrates: 5,
        calories: 50,
        price: 10,
        image: 'image',
        image_large: 'image_large',
        image_mobile: 'image_mobile'
      }
    ];

    const actualState = ingredientsReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      fetchIngredients.fulfilled(ingredients, '')
    );

    expect(actualState).toEqual({
      ingredients: ingredients,
      status: RequestStatus.Success
    });
  });

  it('should set RequestStatus to Failed whhen fetchIngredients rejected', () => {
    const error = 'Failed to fetch ingredients';
    const actualState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error(error), '')
    );

    expect(actualState).toEqual({
      ingredients: null,
      status: RequestStatus.Failed
    });
  });
});
