import {wsOrdersReducer as reducer} from './wsOrderReducer'
import * as types from './../constants/wsOrder';

const initialState = {
  wsConnected: false,
  total: 0,
  totalToday: 0,
  orders: []
}

describe('WS reducer', () => {

    it('Return the ws order initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        initialState
      )
    });

    it('should handle ' + types.WS_CONNECTION_SUCCESS, () => {
      expect(
        reducer(initialState, {
          type: types.WS_CONNECTION_SUCCESS,
          payload: null
        })
      ).toEqual({
          ...initialState,
          wsConnected: true,
          orders: [],
          total: 0,
          totalToday: 0
      });
    });

    it('should handle ' + types.WS_CONNECTION_ERROR, () => {
      expect(
        reducer(initialState, {
          type: types.WS_CONNECTION_ERROR,
          payload: null
        })
      ).toEqual({
          ...initialState,
          orders: [],
          wsConnected: false
      });
    });

    it('should handle ' + types.WS_CONNECTION_CLOSED, () => {
      expect(
        reducer(initialState, {
          type: types.WS_CONNECTION_CLOSED,
          payload: null
        })
      ).toEqual({
          ...initialState,
          wsConnected: false,
          orders: [],
          total: 0,
          totalToday: 0
      });
    });

    it('should handle ' + types.WS_GET_MESSAGE, () => {
      const payload = {
        total: 0,
        totalToday: 0,
        orders: []
      };
      expect(
        reducer(initialState, {
          type: types.WS_GET_MESSAGE,
          payload: payload,
        })
      ).toEqual({
          ...initialState,
          total: payload.total,
          totalToday: payload.totalToday,
          orders: payload.orders
      });
    });

});