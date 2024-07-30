import { TRegisterData, getUserApi, registerUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookie";
import { TUser } from "@utils-types";

export const registerUser = createAsyncThunk(
  "user/loginUser",
  async (data: TRegisterData)=>{
   const info =  await registerUserApi(data);
   if(info.success){
    setCookie('accessToken', info.accessToken);
    localStorage.setItem('refreshToken', info.refreshToken);
   }
   return info
  } 
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {    
    if (localStorage.getItem('refreshToken')) {
      getUserApi().
        then((data)=>{
          dispatch(setUserInfo(data.user));
          dispatch(authChecked(true));
          dispatch(isUserAuthenticated(true))
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

// Wjv-Xxr-pGB-TyG

// {
//   "success": true,
//   "user": {
//       "email": "ww@ww.wwsdfsdfasdasd",
//       "name": "aaaasdad"
//   },
//   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTc3N2Y0MTE5ZDQ1MDAxYjRmYzRiMiIsImlhdCI6MTcyMjI1MTI1MiwiZXhwIjoxNzIyMjUyNDUyfQ.6CuGKsCn4brhcMGJqLzd-d4jb6qI_AwVEkYbxQi1Mqw",
//   "refreshToken": "3a1f50c736408d83e8541935d52c64181d15a0baa2dac33861f62258e91139d83d449bd065b1782e"
// }