import React, { FC, useCallback } from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './../order-details/order-details';
import { useSelector, useDispatch } from "react-redux";
import { getCreateOrder } from "../../services/actions/orderActions";
import { useDrop } from "react-dnd";
import { addIngredient, moveIngredient, removeIngredient } from "../../services/actions/cartActions";
import Card from "./card";
import CartIngredient from "../../model/cartIngredient";
import { useNavigate } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { CLOSE_DETAIL } from "../../services/actions/ingredientDetailAction";
import { ORDER_CLOSE } from "../../services/constants/order";

const BurgerConstructor: FC = () => {

  const cartData = useSelector((store: any) => store.cart);
  const order = useSelector((store: any) => store.order);
  const ingredientData = cartData.items;
  const bunIngredient = ingredientData.find((item: CartIngredient) => item.ingredient.type === 'bun')?.ingredient;
  const centerIngredinets = ingredientData.filter((item: CartIngredient)=> item.ingredient.type !== 'bun');
  const {islogged} = useSelector((store: any) => { return store.auth});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openOrder = () => {
    if(!islogged) {
      navigate('/login');
    }
    let ingredientsIds: string[] = [];
    cartData.items.forEach((item: CartIngredient) => {
      ingredientsIds.push(item.ingredient._id);
    });
    dispatch(getCreateOrder(ingredientsIds));
  }
  const closeOrder = () => {
    dispatch({type: ORDER_CLOSE});
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient: any) {
      dispatch(addIngredient(ingredient));
    },
  });
  const removeItem = (index: number) => {
    dispatch(removeIngredient(index));
  }

  const moveItems = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient(dragIndex, hoverIndex));
  }, [dispatch]);

  const ingredientDetail = useSelector((store: any) => store.ingredientDetail);
  const closeDetail = () => {
    dispatch({type: CLOSE_DETAIL});
    navigate('/');
  }

  return (
    <React.Fragment>
      <div ref={dropTarget}> 
        { ingredientData.length > 0 ?
        <div className={styles.wrapMiddleInner}>
          { bunIngredient ?
          <div className={styles.wrap + ' ' +styles.wrapTop}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bunIngredient.name + ' (верх)'}
                price={bunIngredient.price}
                thumbnail={bunIngredient.image}
              />
          </div>
          : ''}

          <div className={styles.wrapMiddle+ " mt-4 mb-4"} >
            {
              centerIngredinets.map((cnstructorElement: CartIngredient, index: number)=> {
                return (
                  <Card index={index} key={cnstructorElement.id} id={cnstructorElement.id} moveCard={moveItems}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={cnstructorElement.ingredient.name}
                      price={cnstructorElement.ingredient.price}
                      thumbnail={cnstructorElement.ingredient.image}
                      handleClose={() => {removeItem(index)}}
                    />
                  </Card>
                )
              })
            }
          </div>
          <div className={styles.wrap + ' ' +styles.wrapBottom}>
            { bunIngredient ? 
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bunIngredient.name + ' (низ)'}
                price={bunIngredient.price}
                thumbnail={bunIngredient.image}
              />
            : "" }
          </div>
        </div>
        : '' }

        <div className={styles.priceBlock + ' mt-10'}>
          <div className="text text_type_digits-medium">
            <span>{cartData.totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div>
          <Button disabled={ingredientData.length === 0} type="primary" size="large" onClick={openOrder}>Оформить заказ</Button>
          </div>
        </div>
      </div>

       <Modal isOpen={ingredientDetail.isOpen} title={'Детали ингредиента'} onClose={closeDetail} type={'ingredinet'}>
          <IngredientDetails />
      </Modal>
      <Modal isOpen={order.isOpen} title={''} onClose={closeOrder} type={'order'}>
        <OrderDetails />
      </Modal>
    </React.Fragment>
  )
}


export default BurgerConstructor