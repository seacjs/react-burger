import { Ingredient } from './../../model/ingredient';

const OPEN_DETAIL = 'OPEN_DETAIL';
const CLOSE_DETAIL = 'CLOSE_DETAIL';

const showIngredient = (ingredient: Ingredient, isOpen = true) => {
    return {
        type: OPEN_DETAIL,
        ingredient: ingredient,
        isOpen: isOpen
    }
} 

export {
    OPEN_DETAIL,
    CLOSE_DETAIL,
    
    showIngredient
};

