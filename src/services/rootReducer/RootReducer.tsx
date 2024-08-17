import { combineReducers } from 'redux';
import ingredientsSliceReducer from '../slices/IngredientsSlice';
import burgerConstructorSliceReducer from '../slices/BurgerConstructorSlice';
import userAuthSliceReducer from '../slices/UserAuthSlice';
import orderInfoSliceReducer from '../slices/OrdersInfoSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  userAuth: userAuthSliceReducer,
  ordersInfo: orderInfoSliceReducer
});

export default rootReducer;
