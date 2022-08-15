import reducer from './orderReducer'
import * as types from './../constants/order';


const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    isOpen: false
}

describe('Order reducer', () => {

    it('Return the order initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        initialState
      )
    });

    it('should handle ' + types.CREATE_ORDER_REQUEST, () => {
      expect(
        reducer(initialState, {
          type: types.CREATE_ORDER_REQUEST,
        })
      ).toEqual({
        ...initialState,
        orderRequest: true,
      });
    });

    it('should handle ' + types.CREATE_ORDER_SUCCESS, () => {
      const order =  {
        number: 'string',
        name: 'string'
      }
      expect(
        reducer(initialState, {
          type: types.CREATE_ORDER_SUCCESS,
          order: order
        })
      ).toEqual({
        ...initialState,
        orderFailed: false,
        order: order,
        orderRequest: false
      });
    });

    it('should handle ' + types.CREATE_ORDER_FAILED, () => {
      expect(
        reducer(initialState, {
          type: types.CREATE_ORDER_FAILED,
        })
      ).toEqual({
        ...initialState,
        orderFailed: true, 
        orderRequest: false 
      });
    });

    it('should handle ' + types.ORDER_OPEN, () => {
      expect(
        reducer(initialState, {
          type: types.ORDER_OPEN,
        })
      ).toEqual({
        ...initialState,
        isOpen: true 
      });
    });

    it('should handle ' + types.ORDER_CLOSE, () => {
      expect(
        reducer(initialState, {
          type: types.ORDER_CLOSE,
        })
      ).toEqual({
        ...initialState,
        isOpen: false 
      });
    });

});
