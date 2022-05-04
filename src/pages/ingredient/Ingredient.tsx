import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Ingredient as IngredientType } from "../../model/ingredient";
import { PagePropsType } from "../../model/page-props-type";
import { showIngredient } from "../../services/actions/ingredientDetailAction";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';
import { useEffect } from "react";

function Ingredient(props: PagePropsType) {

    const {id} = useParams();
    const ingredientData = useSelector((store: any) => store.ingredients.items);
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