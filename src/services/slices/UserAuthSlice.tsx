import {
  TRegisterData,
  getUserApi,
  registerUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/loginUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((data) => {
          dispatch(setUserInfo(data.user));
          dispatch(isUserAuthenticated(true));
        })
        .finally(() => {
          dispatch(authChecked(true));
        });
    } else {
      dispatch(authChecked(true));
      dispatch(isUserAuthenticated(false));
    }
  }
);

interface TUserAuthState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserError: string | undefined;
  loginUserRequest: boolean;
}

export interface TError {
  success: boolean;
  message: string;
}

export const initialState: TUserAuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: undefined,
  loginUserRequest: false
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    authChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    isUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginUserError = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      });
  }
});

export default userAuthSlice.reducer;
export const {
  authChecked,
  setUserInfo,
  isUserAuthenticated,
  setLoginError,
  updateUserInfo
} = userAuthSlice.actions;
