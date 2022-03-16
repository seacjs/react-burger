import React, { useCallback } from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './../order-details/order-details';
import { Ingredient } from "../../model/ingredient";
import { useSelector, useDispatch } from "react-redux";
import { getCreateOrder, ORDER_CLOSE } from "../../services/actions/orderActions";
import { useDrop } from "react-dnd";
import { addIngredient, moveIngredient, removeIngredient } from "../../services/actions/cartActions";
import Card from "./card";

function BurgerConstructor() {

  const cartData = useSelector((store: any) => store.cart);
  const order = useSelector((store: any) => store.order);
  const ingredientData = cartData.items;
  const bunIngredient = ingredientData.find((item: Ingredient) => item.type === 'bun');
  const centerIngredinets = ingredientData.filter((item: Ingredient)=> item.type !== 'bun');

  const dispatch = useDispatch();
  const openOrder = () => {
    let ingredientsIds: string[] = [];
    cartData.items.forEach((item: Ingredient) => {
      ingredientsIds.push(item._id);
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
              centerIngredinets.map((cnstructorElement: Ingredient, index: number)=> {
                return (
                  <Card index={index} key={cnstructorElement._id + '_' + (+ new Date())} id={cnstructorElement._id + '_' + (+ new Date())} moveCard={moveItems}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={cnstructorElement.name}
                      price={cnstructorElement.price}
                      thumbnail={cnstructorElement.image}
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

      <Modal isOpen={order.isOpen} title={''} onClose={closeOrder}>
        <OrderDetails />
      </Modal>
    </React.Fragment>
  )
}


export default BurgerConstructor