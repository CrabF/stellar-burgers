import { combineReducers } from 'redux';
import  ingredientsSliceReducer  from '../slices/ingredientsSlice';
import burgerConstructorSliceReducer from '../slices/burgerConstructorSlice';
import userAuthSliceReducer from '../slices/userAuthSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  userAuth: userAuthSliceReducer,
});

export default rootReducer;