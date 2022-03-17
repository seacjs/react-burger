import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../actions/ingredientsAction';

const initialState: any = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
}

const ingredientsReducer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
          ...state,
          itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { 
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false
      };
    }
    case GET_ITEMS_FAILED: {
      return { 
        ...state, itemsFailed: true, 
        itemsRequest: false 
      };
    }
    default: 
      return state
  }
}


export default ingredientsReducer;
