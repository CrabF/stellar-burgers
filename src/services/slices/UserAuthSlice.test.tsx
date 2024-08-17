import userAuthSlice, {
  authChecked,
  setUserInfo,
  isUserAuthenticated,
  setLoginError,
  updateUserInfo,
  registerUser,
  initialState
} from './UserAuthSlice';

import { describe, test, expect } from '@jest/globals';

describe('проверка thunk registerUser', () => {
  let mockInitialState = initialState;

  afterEach(() => {
    mockInitialState = initialState;
  });

  test('проверка pending registerUser', () => {
    const action = {
      type: registerUser.pending.type,
      payload: null
    };

    mockInitialState = {
      ...mockInitialState,
      loginUserError: 'email or password are incorrect',
      loginUserRequest: true
    };

    const newState = userAuthSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      loginUserError: undefined,
      loginUserRequest: true
    });
  });

  test('проверка fulfilled registerUser', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: {
          email: 'mail@.mail.ru',
          name: 'name'
        }
      }
    };

    const newState = userAuthSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      isAuthChecked: true,
      isAuthenticated: true,
      user: {
        email: 'mail@.mail.ru',
        name: 'name'
      },
      loginUserRequest: false
    });
  });

  test('проверка rejected registerUser', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'ff' }
    };

    const newState = userAuthSlice(mockInitialState, action);

    expect(newState).toEqual({
      ...mockInitialState,
      isAuthChecked: true
    });
  });
});

describe('проверка редьюсеров userAuthSlice', () => {
  let mockInitialState = initialState;

  let mockUser = {
    email: 'mail@.mail.ru',
    name: 'name'
  };

  afterEach(() => {
    mockInitialState = initialState;
    mockUser = { email: 'mail@.mail.ru', name: 'name' };
  });

  test('проверка редьюсера authChecked', () => {
    mockInitialState = {
      ...mockInitialState,
      isAuthChecked: true
    };

    const newStateFalse = userAuthSlice(mockInitialState, authChecked(false));
    const newStateTrue = userAuthSlice(mockInitialState, authChecked(true));

    expect(newStateFalse.isAuthChecked).toBeFalsy();
    expect(newStateTrue.isAuthChecked).toBeTruthy();
  });

  test('проверка редьюсера setUserInfo', () => {
    const newState = userAuthSlice(mockInitialState, setUserInfo(mockUser));

    expect(newState.user).toBe(mockUser);
  });

  test('проверка редьюсера isUserAuthenticated', () => {
    mockInitialState = {
      ...mockInitialState,
      isAuthenticated: true
    };

    const newStateFalse = userAuthSlice(
      mockInitialState,
      isUserAuthenticated(false)
    );
    const newStateTrue = userAuthSlice(
      mockInitialState,
      isUserAuthenticated(true)
    );

    expect(newStateFalse.isAuthenticated).toBeFalsy();
    expect(newStateTrue.isAuthenticated).toBeTruthy();
  });

  test('проверка редьюсера setLoginError', () => {
    mockInitialState = {
      ...mockInitialState,
      loginUserError: 'Error'
    };

    const newState = userAuthSlice(mockInitialState, setLoginError('Error'));

    expect(newState.loginUserError).toBe('Error');
  });

  test('проверка редьюсера updateUserInfo', () => {
    mockInitialState = {
      ...mockInitialState,
      user: mockUser
    };

    const newUser = {
      email: 'new@new.ru',
      name: 'new'
    };

    const newState = userAuthSlice(mockInitialState, updateUserInfo(newUser));

    expect(newState.user).toBe(newUser);
  });
});
