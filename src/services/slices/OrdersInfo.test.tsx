import { describe, test, expect } from '@jest/globals';
import ordersInfoSlice, {
  initialState,
  getOrdersInfo,
  getUserOrders
} from './OrdersInfoSlice';

const mockOrder = {
  _id: '66afc43c119d45001b4fd954',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2024-08-04T18:11:08.988Z',
  updatedAt: '2024-08-04T18:11:09.478Z',
  number: 48440
};

describe('проверки thunk getOrdersInfo', () => {
  let mockInitialState = initialState;

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
      orders: [mockOrder],
      status: 'done',
      error: 'Error'
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      orders: [],
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
      ...mockInitialState,
      orders: [mockOrder],
      total: 10,
      totalToday: 110,
      status: 'done'
    });
  });

  test('проверка rejected getOrdersInfo', () => {
    const action = {
      type: getOrdersInfo.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      status: 'done',
      error: 'Error'
    });
  });
});

describe('проверка thunk getUserOrders', () => {
  let mockInitialState = initialState;

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
      userOrders: [mockOrder],
      status: 'done',
      error: 'Error'
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      userOrders: [],
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
      ...mockInitialState,
      userOrders: [mockOrder],
      status: 'done'
    });
  });

  test('проверка rejected getUserOrders', () => {
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Error' }
    };

    const newState = ordersInfoSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      status: 'done',
      error: 'Error'
    });
  });
});
