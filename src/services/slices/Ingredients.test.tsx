import ingredientsSlice, {
  getIngredients,
  initialState
} from './IngredientsSlice';

import { describe, test, expect } from '@jest/globals';

describe('тесты состояний thunk getIngredients', () => {
  const expectedResult = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  let mockInitialState = initialState;

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('тест fetchIngredients.pending', () => {
    const action = {
      type: getIngredients.pending.type,
      payload: null
    };

    const newState = ingredientsSlice(mockInitialState, action);
    expect(newState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  test('тест fetchIngredients.fullfiled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: expectedResult
    };

    const newState = ingredientsSlice(mockInitialState, action);

    expect(newState).toEqual({
      ingredients: expectedResult,
      loading: false,
      error: null
    });
  });

  test('тест fetchIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ingredientsSlice(mockInitialState, action);
    expect(newState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Error'
    });
  });
});
