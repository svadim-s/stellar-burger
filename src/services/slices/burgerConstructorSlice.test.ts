import {
  burgerConstructorActions,
  burgerConstructorReducer
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const bun: TIngredient = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image',
    image_large: 'image_large',
    image_mobile: 'image_mobile'
  };

  const ingredient_1: TIngredient = {
    _id: '2',
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
  };

  it('addItem action for bun', () => {
    const action = burgerConstructorActions.addItem(bun);
    const newState = burgerConstructorReducer(initialState, action);

    expect(newState.bun).toEqual(expect.objectContaining(bun));
  });

  it('addItem action for ingredients', () => {
    let newState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addItem(ingredient_1)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining(ingredient_1)
    );
  });

  it('removeItem action', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [{ ...ingredient_1, id: 'unique-id' }]
    };
    const action = burgerConstructorActions.removeItem('2');
    const newState = burgerConstructorReducer(stateWithIngredients, action);

    expect(newState.ingredients).toHaveLength(0);
  });
});
