import { combineReducers } from 'redux';
import ingredientsSliceReducer from '../slices/ingredientsSlice';
import burgerConstructorSliceReducer from '../slices/burgerConstructorSlice';
import userAuthSliceReducer from '../slices/userAuthSlice';
import orderInfoSliceReducer from '../slices/ordersInfo';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  userAuth: userAuthSliceReducer,
  ordersInfo: orderInfoSliceReducer,
});

export default rootReducer;