import { Ingredient } from './../../model/ingredient';

const OPEN_DETAIL = 'OPEN_DETAIL';
const CLOSE_DETAIL = 'CLOSE_DETAIL';

const showIngredient = (ingredient: Ingredient) => {
    return {
        ingredient: ingredient,
        isOpen: true
    }
} 

export {
    OPEN_DETAIL,
    CLOSE_DETAIL,
    
    showIngredient
};

