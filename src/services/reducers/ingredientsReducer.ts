import { Ingredient } from '../../model/ingredient';
import { TIngredientsActions } from '../actions/ingredientsAction';
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../constants/ingredients';

export type TInitialStateIngredientsReducer = {
  items: Ingredient[],
  itemsRequest: boolean,
  itemsFailed: boolean
}

const initialState: TInitialStateIngredientsReducer = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
}

const ingredientsReducer = (state: TInitialStateIngredientsReducer = initialState, action: TIngredientsActions) => {
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
