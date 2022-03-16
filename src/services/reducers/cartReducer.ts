import CartIngredient from '../../model/cartIngredient';
import { Ingredient } from '../../model/ingredient';
import { ADD_INGREDIENT, MOVE_INGREDINET, REMOVE_INGREDIENT } from "../actions/cartActions";
import { v4 as uuidv4 } from 'uuid';

interface InitialStateCart  {
  items: CartIngredient[],
  totalPrice: number
}
const initialState: InitialStateCart = {
  items: [],
  totalPrice: 0
};

const cartReducer = (state: InitialStateCart = initialState, action: any): any => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      // todo: refactor
      let items = state.items;
      let newPrice = state.totalPrice + action.ingredient.price;
      if (action.ingredient.type === 'bun') {
        // булка считается дважды т.к. снизу и сверху
        newPrice += action.ingredient.price;
        const index = items.findIndex(item => item.ingredient.type === 'bun');
        if (index !== -1) {
          const deleteeItems = items.splice(index, 1);
          // булка считается дважды т.к. снизу и сверху
          newPrice -= (deleteeItems[0].ingredient.price * 2);
        }
      }
      const cartIngredinet = {
        ingredient: action.ingredient,
        id: uuidv4()
      }
      return {
        ...state, 
        items: [
          ...items,
          cartIngredinet
        ],
        totalPrice: newPrice
      }
    }
    case REMOVE_INGREDIENT: {
      // todo: refactor
      const bunItems: CartIngredient[] = state.items.filter(item => item.ingredient.type === 'bun');
      const items: CartIngredient[] = state.items.filter(item => item.ingredient.type !== 'bun');
      const deletedItem: CartIngredient = items.splice(action.index, 1)[0];
      return {
        ...state, 
        items: bunItems.concat(items),
        totalPrice: state.totalPrice - deletedItem.ingredient.price
      }
    }
    case MOVE_INGREDINET: {
      const [...items] = state.items.filter(item => item.ingredient.type !== 'bun');
      const lastIndex = action.lastIndex;
      const newIndex = action.newIndex;
      items[lastIndex] = items.splice(newIndex, 1, items[lastIndex])[0];
      return {
        ...state,
        items: state.items.filter(item => item.ingredient.type === 'bun').concat(items),
      }
    }
    default: 
      return state;
  }
}

export default cartReducer;