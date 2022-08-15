import reducer from './cartReducer'
import * as types from './../constants/cart';
import { v4 } from 'uuid';
jest.mock('uuid');

const initialState = {
    items: [],
    totalPrice: 0
}
const ingredient = {
    _id: 'string',
    name: 'string',
    type: 'string',
    proteins: 123,
    fat: 324,
    carbohydrates: 342,
    calories: 2321,
    price: 1000,
    image: 'link',
    image_mobile: 'link',
    image_large: 'link',
    __v: 123
}
const index = 0;
const lastIndex = 0;
const newIndex = 1;
const totalPrice = 10000;
const cartIngredinet = {
    ingredient: ingredient,
    id: 'testid'
}
const cartIngredinet2 = {
    ingredient: ingredient,
    id: 'testid'
}
const cartItems = [
    cartIngredinet
];
const cartItemsMove = [
    cartIngredinet,
    cartIngredinet2
];


describe('cart reducer', () => {

    it('Return the cart initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        initialState
      )
    });

    it('should handle ' + types.ADD_INGREDIENT, () => {
        v4.mockImplementation(() => 'testid');
        expect(
          reducer(initialState, {
            type: types.ADD_INGREDIENT,
            ingredient: ingredient
          })
        ).toEqual({
            ...initialState,
            items: [cartIngredinet],
            totalPrice: ingredient.price
        });
      });

      it('should handle ' + types.REMOVE_INGREDIENT, () => {
        expect(
          reducer({...initialState, items: cartItems}, {
            type: types.REMOVE_INGREDIENT,
            index: index
          })
        ).toEqual({
            ...initialState,
            items: [],
            totalPrice: initialState.totalPrice - ingredient.price
        });
      });

      it('should handle ' + types.MOVE_INGREDINET, () => {
        expect(
          reducer({...initialState, items: [cartIngredinet2, cartIngredinet]}, {
            type: types.MOVE_INGREDINET,
            lastIndex: lastIndex,
            newIndex: newIndex
          })
        ).toEqual({
            ...initialState,
            items: [cartIngredinet, cartIngredinet2],
        });
      });

});