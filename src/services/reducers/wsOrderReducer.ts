import { TOrder } from './../../components/types/order';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../constants/wsOrder';
import { TwsOrderActions } from '../actions/wsOrderAction';
  
  type initialStateType = {
    wsConnected: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
  }

  const initialState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    orders: []
  };
  
  export const wsOrdersReducer = (state: initialStateType = initialState, action: TwsOrderActions) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          orders: [],
          total: 0,
          totalToday: 0
        };
        
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          orders: [],
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          orders: [],
          total: 0,
          totalToday: 0
        };
  
      case WS_GET_MESSAGE:
        // todo-remove:
        console.log('---', action);
        return {
          ...state,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          orders: action.payload.orders
        };
  
      default:
        return state;
    }
  };