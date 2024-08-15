import { describe, test, expect } from '@jest/globals';
import ordersInfoSlice, {
  initialState,
  getOrdersInfo,
  getUserOrders
} from './OrdersInfoSlice';

describe('проверки thunk getOrdersInfo', () => {
  let mockInitialState = initialState;

  const mockOrder = {
    _id: '66afc43c119d45001b4fd954',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2024-08-04T18:11:08.988Z',
    updatedAt: '2024-08-04T18:11:09.478Z',
    number: 48440
  };

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('проверка pending getOrdersInfo', () => {
    const action = {
      type: getOrdersInfo.pending.type,
      payload: null
    };

    mockInitialState = {
      ...mockInitialState,
      orders: [mockOrder]
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      orders: [],
      userOrders: [],
      total: 0,
      totalToday: 0,
      status: 'loading',
      error: null
    });
  });

  test('проверка fulfilled getOrdersInfo', () => {
    const action = {
      type: getOrdersInfo.fulfilled.type,
      payload: {
        orders: [mockOrder],
        total: 10,
        totalToday: 110
      }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      orders: [mockOrder],
      userOrders: [],
      total: 10,
      totalToday: 110,
      status: 'done',
      error: null
    });
  });

  test('проверка rejected getOrdersInfo', () => {
    const action = {
      type: getOrdersInfo.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      orders: [],
      userOrders: [],
      total: 0,
      totalToday: 0,
      status: 'done',
      error: 'Error'
    });
  });
});

describe('проверка thunk getUserOrders', () => {
  let mockInitialState = initialState;

  const mockOrder = {
    _id: '66afc43c119d45001b4fd954',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2024-08-04T18:11:08.988Z',
    updatedAt: '2024-08-04T18:11:09.478Z',
    number: 48440
  };

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('проверка pending getUserOrders', () => {
    const action = {
      type: getUserOrders.pending.type,
      payload: null
    };

    mockInitialState = {
      ...mockInitialState,
      userOrders: [mockOrder]
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      orders: [],
      userOrders: [],
      total: 0,
      totalToday: 0,
      status: 'loading',
      error: null
    });
  });

  test('проверка fulfilled getUserOrders', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: [mockOrder]
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      orders: [],
      userOrders: [mockOrder],
      total: 0,
      totalToday: 0,
      status: 'done',
      error: null
    });
  });

  test('проверка rejected getUserOrders', () => {
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      orders: [],
      userOrders: [],
      total: 0,
      totalToday: 0,
      status: 'done',
      error: 'Error'
    });
  });
});
