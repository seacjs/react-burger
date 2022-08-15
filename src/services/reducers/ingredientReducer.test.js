import reducer from './ingredientsReducer'
import * as types from './../constants/ingredients';


const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
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

describe('ingredient reducer', () => {

    it('Return the ingredient initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        initialState
      )
    });

    it('should handle ' + types.GET_ITEMS_REQUEST, () => {
      expect(
        reducer(initialState, {
          type: types.GET_ITEMS_REQUEST,
        })
      ).toEqual({
        ...initialState,
        itemsRequest: true
      });
    });

    it('should handle ' + types.GET_ITEMS_SUCCESS, () => {
      const items = [
        ingredient
      ];
      expect(
        reducer(initialState, {
          type: types.GET_ITEMS_SUCCESS,
          items: items
        })
      ).toEqual({
        ...initialState,
        itemsFailed: false,
        items: items,
        itemsRequest: false
      });
    });

    it('should handle ' + types.GET_ITEMS_FAILED, () => {
      expect(
        reducer(initialState, {
          type: types.GET_ITEMS_FAILED,
        })
      ).toEqual({
        ...initialState,
        itemsFailed: true, 
        itemsRequest: false 
      });
    });

});
