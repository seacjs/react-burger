import { wsActions } from './../actions/wsOrderAction';
import { socketMiddleware } from './../middleware/socket-middleware';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import ingredientDetailReducer from './ingredientDetailReducer';
import ingredientsReducer from './ingredientsReducer';
import orderReducer from './orderReducer';
import feedOrderDetailReduser from './feedOrderDetailReducer';
import { wsOrdersReducer } from './wsOrderReducer';
import thunk from 'redux-thunk';

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,
  auth: authReducer,
  wsOrders: wsOrdersReducer,
  feedOrderDetail: feedOrderDetailReduser
});

export const store = createStore(rootReducer, applyMiddleware(thunk, socketMiddleware(wsActions)));
export type AppDispatch = typeof store.dispatch;

export default rootReducer;