import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import ingredientDetailReducer from './ingredientDetailReducer';
import ingredientsReducer from './ingredientsReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer;