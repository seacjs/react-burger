import reducer from './ingredientDetailReducer'
import * as types from './../constants/ingredientsDetail';


const initialState = {
    isOpen: false,
    ingredient: null
}
const ingredient = {
  _id: 'string',
  name: 'string',
  type: 'string',
  proteins: 100,
  fat: 100,
  carbohydrates: 100,
  calories: 100,
  price: 100,
  image: 'string',
  image_mobile: 'string',
  image_large: 'string',
  __v: 100
}

describe('ingredient detail reducer', () => {

    it('Return the ingredientDetail initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        initialState
      )
    });

    it('should handle ' + types.OPEN_DETAIL, () => {
      const isOpen = true;
      expect(
        reducer(initialState, {
          type: types.OPEN_DETAIL,
          ingredient: ingredient,
          isOpen: isOpen
        })
      ).toEqual({
        ...initialState,
        ingredient: ingredient,
        isOpen: isOpen
      });
    });

    it('should handle ' + types.CLOSE_DETAIL, () => {
      const isOpen = false;
      expect(
        reducer(initialState, {
          type: types.CLOSE_DETAIL,
          isOpen: isOpen
        })
      ).toEqual({
        ...initialState,
        isOpen: isOpen
      });
    });

});
