import { Ingredient } from '../../model/ingredient';

const ADD_INGREDIENT = 'ADD_INGREDIENT';
const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
const MOVE_INGREDINET = 'MOVE_INGREDINET';

const addIngredient = (ingredient: Ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient: ingredient
    }
} 

const removeIngredient = (index: number) => {
    return {
        type: REMOVE_INGREDIENT,
        index: index
    }
}

const moveIngredient = (lastIndex: number, newIndex: number) => {
    return {
        type: MOVE_INGREDINET,
        lastIndex: lastIndex,
        newIndex: newIndex
    }
}

export {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDINET,

    addIngredient,
    removeIngredient,
    moveIngredient
};