import { CLOSE_DETAIL, OPEN_DETAIL } from '../actions/ingredientDetailAction';

interface initialStateDetail {
  isOpen: boolean
}

const initialState: initialStateDetail = {
  isOpen: false
}

const ingredientDetailReducer = (state: initialStateDetail = initialState, action: any): any => {
  switch (action.type) {
    case OPEN_DETAIL: {
      return {
        ...state,
        isOpen: true
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