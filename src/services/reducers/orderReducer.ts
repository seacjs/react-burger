import { Order } from './../../model/order';
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, ORDER_OPEN, ORDER_CLOSE } from '../actions/orderActions';

interface initialStateOrder {
  order: Order | null,
  orderRequest: boolean,
  orderFailed: boolean,
  isOpen: boolean
}

const initialState: initialStateOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  isOpen: false
}

const orderReducer = (state: initialStateOrder = initialState, action: any): any => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
          ...state,
          orderRequest: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return { 
        ...state,
        orderFailed: false,
        order: action.order,
        orderRequest: false
      };
    }
    case CREATE_ORDER_FAILED: {
      return { 
        ...state, 
        orderFailed: true, 
        orderRequest: false 
      };
    }
    case ORDER_OPEN: {
      return { 
        ...state,
        isOpen: true 
      };
    }
    case ORDER_CLOSE: {
      return { 
        ...state, 
        isOpen: false 
      };
    }
    default: 
      return state
  }
}

export default orderReducer;