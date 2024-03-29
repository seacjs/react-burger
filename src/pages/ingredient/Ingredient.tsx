import { useParams } from "react-router-dom";
import { Ingredient as IngredientType } from "../../model/ingredient";
import { PagePropsType } from "../../model/page-props-type";
import { showIngredient } from "../../services/actions/ingredientDetailAction";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';
import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../../hooks/hooks";

const Ingredient: FC<PagePropsType> = () => {

    const {id} = useParams();
    const ingredientData = useSelector(store => store.ingredients.items);
    const [ingridient] = ingredientData.filter((item: IngredientType)=> item._id === id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showIngredient(ingridient, false));
    }, []);

    return (
        <>
            <div className={styles.ingredientWrap}>
                <IngredientDetails />
            </div>
        </>
    )
}
export default Ingredient;