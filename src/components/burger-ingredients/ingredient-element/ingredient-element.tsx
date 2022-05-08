import React, { useEffect } from "react";
import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details'
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DETAIL, OPEN_DETAIL, showIngredient } from "../../../services/actions/ingredientDetailAction";
import { useDrag } from "react-dnd";
import { Ingredient } from "../../../model/ingredient";
import CartIngredient from "../../../model/cartIngredient";
import { useLocation, useNavigate } from "react-router-dom";

interface propType  {
  ingridient: Ingredient
}

function IngredientElement(props: any) {

  const { image, price, name, calories, proteins, fat, carbohydrates} = props.ingridient;
  const {ingridient} = props;

  const cart = useSelector((store: any) => store.cart);
  const navigate = useNavigate();
  const location = useLocation();
  let stateLcation = location.state as { backgroundLocation?: Location, from: any, ingridientId: any };

  const dispatch = useDispatch();

  const openDetail = () => {
    navigate( `/ingredients/${ingridient._id}`, {state: { backgroundLocation: location, ingridientId: ingridient._id}});
    dispatch(showIngredient(ingridient));
  }

  const [{isDrag}, dragRef] = useDrag({
      type: "ingredient",
      item: ingridient,
      collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  useEffect(() => {
    if(stateLcation && (stateLcation?.backgroundLocation?.pathname !== location?.pathname)) {
      // navigate( `/ingredients/${ingridient._id}`, {state: { backgroundLocation: stateLcation.backgroundLocation }});
      if(stateLcation?.ingridientId === ingridient._id) {
        dispatch(showIngredient(ingridient));
      }
    }
  }, []);


  return (
    <React.Fragment>
      { 
        !isDrag && 
        <div ref={dragRef} className={styles.card + ' mt-6 mb-10 align-center'} onClick={openDetail}>
          {
            cart.items.filter((item: CartIngredient) => item.ingredient._id === ingridient._id).length ?
            <Counter count={cart.items.filter((item: CartIngredient) => item.ingredient._id === ingridient._id).length} size="default" /> :
            ''
          }
          <img src={image} className={styles.img} alt={name} />
          <div className={styles.price + ' text text_type_digits-default pt-1 pb-1'}> 
            {price} <CurrencyIcon type="primary" />
          </div>
          <div className={styles.name}> 
            {name}
          </div>
        </div>
      }
    </React.Fragment>
  )

}

export default IngredientElement