import { TOrder } from './../../components/types/order';
import { 
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_FEED_DETAIL,
  CLOSE_FEED_DETAIL
} from '../constants/feedOrderDetail';
import { TFeedOrderDetailctions } from '../actions/feedOrderDetailActions';

interface initialStateFeedOrderDetailReduser {
    order: TOrder | null,
    orderRequest: boolean,
    orderFailed: boolean
    isOpen: boolean
  }
  
  const initialState: initialStateFeedOrderDetailReduser = {
    order: null,
    isOpen: false,
    orderRequest: false,
    orderFailed: false
  }

const feedOrderDetailReduser = (state: initialStateFeedOrderDetailReduser = initialState, action: TFeedOrderDetailctions): initialStateFeedOrderDetailReduser => {
    switch (action.type) {
      case GET_ORDER_REQUEST: {
        return {
            ...state,
            orderRequest: true
        };
      }
      case GET_ORDER_SUCCESS: {
        return {
            ...state,
            orderFailed: false,
            order: action.order,
            orderRequest: false
        };
      }
      case GET_ORDER_FAILED: {
        return {
            ...state,
            orderRequest: false 
        };
      }

      case OPEN_FEED_DETAIL: {
        return {
            ...state,
            order: action.order,
            isOpen: action.isOpen 
        };
      }
      case CLOSE_FEED_DETAIL: {
        return { 
          ...state, 
          isOpen: action.isOpen 
        };
      }
      default: 
        return state
    }
  }

export default feedOrderDetailReduser;