import { combineReducers } from 'redux';
import ingredientsSliceReducer from '../slices/ingredientsSlice';
import burgerConstructorSliceReducer from '../slices/burgerConstructorSlice';
import userAuthSliceReducer from '../slices/userAuthSlice';
import orderInfoSliceReducer from '../slices/orderInfo';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  userAuth: userAuthSliceReducer,
  orderInfo: orderInfoSliceReducer,
});

export default rootReducer;