import { TRegisterData, getUserApi, registerUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookie";
import { TUser } from "@utils-types";

export const registerUser = createAsyncThunk(
  "user/loginUser",
  async (data: TRegisterData)=>{
    return registerUserApi(data)
  } 
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {    
    // localStorage.getItem('refreshToken')
    // if(getCookie('accessToken'))
    if (getCookie('accessToken')) {
      getUserApi()
        .then((data)=>{
          dispatch(setUserInfo(data.user));
          dispatch(isUserAuthenticated(true))
        })
        .finally(()=>{
          dispatch(authChecked(true));
        })
    } else {
      dispatch(authChecked(true));
      dispatch(isUserAuthenticated(false))
    }
}); 

interface TUserAuthState {
  isAuthChecked: boolean, 
  isAuthenticated: boolean;
  user: TUser | null,
  loginUserError: string | undefined,
  loginUserRequest: boolean,
}

export interface TError {
  success: boolean,
  message: string
}

const initialState: TUserAuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: undefined,
  loginUserRequest: false,
}

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers:{
    authChecked: (state, action) => {
      state.isAuthChecked = action.payload;
      // state.isAuthenticated = true
    },
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
    isUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    isUserLogin: (state, action) => {
      state.loginUserRequest = action.payload
    },
    setLoginError : (state, action) => {
      state.loginUserError = action.payload
    },
    setUserLoginError: (state, action) => {
      state.loginUserError = action.payload
    }
  },
  extraReducers(builder) {
    builder.
          addCase(registerUser.pending, (state, action)=>{
            state.loginUserRequest = true;
            state.loginUserError = undefined;
          })
          .addCase(registerUser.fulfilled, (state, action)=>{
            // state.user = action.payload;
            state.user = action.payload.user;
            state.loginUserRequest = false;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
            setCookie('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
          })
          .addCase(registerUser.rejected, (state, action)=>{
            state.loginUserRequest = false;
            // state.loginUserError = action.payload;
            state.isAuthChecked = true;
            state.isAuthenticated = false;
          })
  },
});

export default userAuthSlice.reducer;
export const { authChecked, setUserInfo, isUserAuthenticated, isUserLogin, setLoginError } = userAuthSlice.actions;