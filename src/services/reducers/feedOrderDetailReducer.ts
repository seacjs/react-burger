import { TOrder } from './../../components/types/order';
import { 
    OPEN_FEED_DETAIL,
    CLOSE_FEED_DETAIL
} from '../constants/feedOrderDetail';

interface initialStateFeedOrderDetailReduser {
    order: TOrder | null,
    isOpen: boolean
  }
  
  const initialState: initialStateFeedOrderDetailReduser = {
    order: null,
    isOpen: false
  }

const feedOrderDetailReduser = (state: initialStateFeedOrderDetailReduser = initialState, action: any): any => {
    switch (action.type) {
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