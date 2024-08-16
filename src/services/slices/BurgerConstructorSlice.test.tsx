import burgerConstructorSlice, {
  initialState,
  addIngredients,
  addBun,
  deleteIngredient,
  addOrderRequest,
  addModalData,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp,
  TBunIngredient
} from './BurgerConstructorSlice';

import { describe, test, expect } from '@jest/globals';

describe('позитивные тесты burgerConstructorSlice', () => {
  const mockIngredients = [
    {
      id: '0',
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
      id: '1',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      id: '2',
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
    }
  ];

  const mockModalDAta = {
    success: true,
    name: 'Флюоресцентный бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ],
      _id: '66bb4bab119d45001b4ff73a',
      owner: {
        name: 'ssd',
        email: 'dd@dd.qqsw',
        createdAt: '2024-08-04T18:10:48.987Z',
        updatedAt: '2024-08-10T19:20:46.995Z'
      },
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-08-13T12:03:55.753Z',
      updatedAt: '2024-08-13T12:03:56.213Z',
      number: 49547,
      price: 1976
    }
  };

  const mockOrder = {
    _id: '66afc43c119d45001b4fd954',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2024-08-04T18:11:08.988Z',
    updatedAt: '2024-08-04T18:11:09.478Z',
    number: 48440
  };

  let mockInitialState = initialState;

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('проверка редьюсера addIngredients', () => {
    const newState = burgerConstructorSlice(
      mockInitialState,
      addIngredients({ ingredient: mockIngredients })
    );
    expect(newState).toEqual({
      ...mockInitialState,
      ingredients: [mockIngredients]
    });
  });

  test('проверка редьюсера addBun', () => {
    const newState = burgerConstructorSlice(
      mockInitialState,
      addBun({ ingredient: mockIngredients[0] })
    );
    expect(newState).toEqual({
      ...mockInitialState,
      bun: mockIngredients[0]
    });
  });

  test('проверка редьюсера deleteIngredient', () => {
    mockInitialState = {
      ...mockInitialState,
      ingredients: [mockIngredients[1]]
    };

    const newState = burgerConstructorSlice(
      mockInitialState,
      deleteIngredient({ id: mockIngredients[1].id })
    );
    expect(newState).toEqual({
      ...mockInitialState,
      ingredients: []
    });
  });

  test('проверка редьюсера addOrderRequest', () => {
    const newStateTrue = burgerConstructorSlice(
      mockInitialState,
      addOrderRequest(true)
    );
    const newStateFalse = burgerConstructorSlice(
      mockInitialState,
      addOrderRequest(false)
    );

    expect(newStateTrue).toEqual({
      ...mockInitialState,
      orderRequest: true
    });

    expect(newStateFalse).toEqual({
      ...mockInitialState,
      orderRequest: false
    });
  });

  test('проверка редьюсера addModalData', () => {
    const newState = burgerConstructorSlice(
      mockInitialState,
      addModalData(mockModalDAta)
    );
    expect(newState).toEqual({
      ...mockInitialState,
      orderModalData: mockModalDAta
    });
  });

  test('проверка редьюсера clearConstructor', () => {
    mockInitialState = {
      bun: mockIngredients[0] as TBunIngredient,
      ingredients: mockIngredients,
      orderRequest: true,
      orderModalData: mockOrder
    };

    const newState = burgerConstructorSlice(
      mockInitialState,
      clearConstructor()
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null
    });
  });

  test('проверка редьюсера moveIngredientUp', () => {
    mockInitialState = {
      ...mockInitialState,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };

    const newState = burgerConstructorSlice(
      mockInitialState,
      moveIngredientUp(mockIngredients[2])
    );
    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[1]).toEqual(mockInitialState.ingredients[0]);
    expect(newState.ingredients[0]).toEqual(mockInitialState.ingredients[1]);
  });

  test('проверка редьюсера moveIngredientDown', () => {
    mockInitialState = {
      ...mockInitialState,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };

    const newState = burgerConstructorSlice(
      mockInitialState,
      moveIngredientDown(mockIngredients[1])
    );
    expect(newState.ingredients.length).toBe(2);
    expect(newState.ingredients[0]).toEqual(mockInitialState.ingredients[1]);
    expect(newState.ingredients[1]).toEqual(mockInitialState.ingredients[0]);
  });
});
