import { TRegisterData, getUserApi, registerUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookie";

export const registerUser = createAsyncThunk(
  "user/loginUser",
  async (data: TRegisterData)=>{
   const info =  await registerUserApi(data);
   if(info.success){
    setCookie('accessToken', info.accessToken);
   }
   return data
  } 
);


export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    // const cookie = await getCookie('accessToken');
    
    if (localStorage.getItem('accessToken')) {

      const userData = await getUserApi().
        then((data)=>{
          dispatch(setUserInfo(data.user));
          dispatch(authChecked());
        })
    } else {
      dispatch(authChecked());
    }
}); 

interface TUserAuthState {
  isAuthChecked: boolean, 
  isAuthenticated: boolean;
  user: {},
  loginUserError: unknown | null,
  loginUserRequest: boolean,
}

const initialState: TUserAuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: {},
  loginUserError: null,
  loginUserRequest: false,
}

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers:{
    authChecked: (state) => {
      state.isAuthChecked = true;
      // state.isAuthenticated = true
    },
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers(builder) {
    builder.
          addCase(registerUser.pending, (state, action)=>{
            state.loginUserRequest = true;
            state.loginUserError = null;
          })
          .addCase(registerUser.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.loginUserRequest = false;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
          })
          .addCase(registerUser.rejected, (state, action)=>{
            state.loginUserRequest = false;
            state.loginUserError = action.payload;
            state.isAuthChecked = true;
          })
  },
});

export default userAuthSlice.reducer;
export const { authChecked, setUserInfo } = userAuthSlice.actions;

// Wjv-Xxr-pGB-TyG