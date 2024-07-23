import { combineReducers } from 'redux';
import  ingredientsSliceReducer  from '../slices/ingredientsSlice';
import burgerConstructorSliceReducer from '../slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
});

export default rootReducer;