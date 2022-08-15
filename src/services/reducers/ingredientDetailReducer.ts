import { Ingredient } from './../../model/ingredient';
import { CLOSE_DETAIL, OPEN_DETAIL } from '../constants/ingredientsDetail';
import { TdetailIngredient } from '../actions/ingredientDetailAction';

interface initialStateDetail {
  isOpen: boolean,
  ingredient: Ingredient | null
}

const initialState: initialStateDetail = {
  isOpen: false,
  ingredient: null
}

const ingredientDetailReducer = (state: initialStateDetail = initialState, action: TdetailIngredient): initialStateDetail => {
  switch (action.type) {
    case OPEN_DETAIL: {
      return {
        ...state,
        ingredient: action.ingredient,
        isOpen: action.isOpen
      }
    }
    case CLOSE_DETAIL: {
      return {
        ...state,
        isOpen: false
      }
    }
    default: 
      return state
  }
}


export default ingredientDetailReducer;