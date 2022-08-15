import { TauthActions } from './../actions/authAction';
import { TwsOrderActions, wsActions } from './../actions/wsOrderAction';
import { socketMiddleware } from './../middleware/socket-middleware';
import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import ingredientDetailReducer from './ingredientDetailReducer';
import ingredientsReducer, { TInitialStateIngredientsReducer } from './ingredientsReducer';
import orderReducer from './orderReducer';
import feedOrderDetailReduser from './feedOrderDetailReducer';
import { wsOrdersReducer } from './wsOrderReducer';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TIngredientsActions } from '../actions/ingredientsAction';
import { TcartActions } from '../actions/cartActions';
import { TdetailIngredient } from '../actions/ingredientDetailAction';
import { TFeedOrderDetailctions } from '../actions/feedOrderDetailActions';
import { TorderActions } from '../actions/orderActions';

export type TApplicationActions = TauthActions 
| TcartActions
| TFeedOrderDetailctions
| TIngredientsActions
| TorderActions
| TwsOrderActions
| TdetailIngredient;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType, // возвращаемый тип после выхоза thunk
  RootState, // root state )))
  unknown, // дополнительный аргумент добавляемый в каждый thunk, в проекте мы его не использовали
  TApplicationActions // Список всех обычных экшенов
>;

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
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export default rootReducer;