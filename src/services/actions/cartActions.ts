import CartIngredient from '../../model/cartIngredient';
import { Ingredient } from '../../model/ingredient';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDINET
} from '../constants/cart';

export interface IaddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly ingredient:  Ingredient;
}
export interface IremoveIngredient {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly index: number;
}
export interface ImoveIngredient {
    readonly type: typeof MOVE_INGREDINET;
    readonly lastIndex: number;
    readonly newIndex: number;
}
export type TcartActions = IaddIngredient
| IremoveIngredient
| ImoveIngredient;

export const addIngredient = (ingredient: Ingredient): IaddIngredient => ({
    type: ADD_INGREDIENT,
    ingredient: ingredient
});
export const removeIngredient = (index: number): IremoveIngredient => ({
    type: REMOVE_INGREDIENT,
    index: index
});
export const moveIngredient = (lastIndex: number, newIndex: number): ImoveIngredient => ({
    type: MOVE_INGREDINET,
    lastIndex: lastIndex,
    newIndex: newIndex
});
