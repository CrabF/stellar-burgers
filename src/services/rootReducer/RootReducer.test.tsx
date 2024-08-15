import { expect, test } from '@jest/globals';
import rootReducer from './RootReducer';
import { configureStore } from '@reduxjs/toolkit';
import store from '../store';

test('проверка инициализации редьюсера rootReducer', () => {
  const newStore = configureStore({ reducer: rootReducer });
  expect(newStore.getState()).toEqual(store.getState());
});
