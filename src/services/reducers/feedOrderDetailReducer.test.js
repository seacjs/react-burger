import reducer from './feedOrderDetailReducer'
import * as types from './../constants/feedOrderDetail';

const initialState  = {
  order: null,
  isOpen: false,
  orderRequest: false,
  orderFailed: false
}
const order = {
  ingredients: [],
  _id: 'string',
  status: 'string',
  name: 'string',
  number: 10,
  createdAt: 'string',
  updatedAt: 'string'
}

describe('Feed order detail reducer', () => {

    it('Return the feedOrderDetail initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        initialState
      )
    });

    it('should handle ' + types.GET_ORDER_REQUEST, () => {
      expect(
        reducer(initialState, {
          type: types.GET_ORDER_REQUEST,
        })
      ).toEqual({
        ...initialState,
        orderRequest: true
      });
    });


    it('should handle ' + types.GET_ORDER_SUCCESS, () => {
      expect(
        reducer(initialState, {
          type: types.GET_ORDER_SUCCESS,
          order: order
        })
      ).toEqual({
        ...initialState,
        orderFailed: false,
        order: order,
        orderRequest: false
      });
    });


    it('should handle ' + types.GET_ORDER_FAILED, () => {
      expect(
        reducer(initialState, {
          type: types.GET_ORDER_FAILED,
        })
      ).toEqual({
        ...initialState,
        orderRequest: false 
      });
    });

    it('should handle ' + types.OPEN_FEED_DETAIL, () => {
      const isOpen = true;
      expect(
        reducer(initialState, {
          type: types.OPEN_FEED_DETAIL,
          isOpen: isOpen,
          order: order
        })
      ).toEqual({
        ...initialState,
        order: order,
        isOpen: isOpen 
      });
    });

    it('should handle ' + types.CLOSE_FEED_DETAIL, () => {
      const isOpen = false;
      expect(
        reducer(initialState, {
          type: types.CLOSE_FEED_DETAIL,
          isOpen: isOpen
        })
      ).toEqual({
        ...initialState,
        isOpen: isOpen 
      });
    });


});