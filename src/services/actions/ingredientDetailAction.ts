import { Ingredient } from './../../model/ingredient';
import {
    OPEN_DETAIL,
    CLOSE_DETAIL,
} from '../constants/ingredientsDetail';

export interface IshowIngredient {
    readonly type: typeof OPEN_DETAIL;
    readonly ingredient: Ingredient;
    readonly isOpen: boolean;
}

export interface IhideIngredient {
    readonly type: typeof CLOSE_DETAIL;
    readonly isOpen: boolean;
}

export type TdetailIngredient = IshowIngredient
| IhideIngredient;

export const showIngredient = (ingredient: Ingredient, isOpen = true): IshowIngredient => ({
    type: OPEN_DETAIL,
    ingredient: ingredient,
    isOpen: isOpen
})

export const hideIngredient = (isOpen = false): IhideIngredient => ({
    type: CLOSE_DETAIL,
    isOpen: isOpen
}) 