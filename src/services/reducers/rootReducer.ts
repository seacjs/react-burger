import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import ingredientDetailReducer from './ingredientDetailReducer';
import ingredientsReducer from './ingredientsReducer';
import orderReducer from './orderReducer';
import feedOrderDetailReduser from './feedOrderDetailReducer';
import { wsOrdersReducer } from './wsOrderReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,
  auth: authReducer,
  wsOrders: wsOrdersReducer,
  feedOrderDetail: feedOrderDetailReduser
});

export default rootReducer;