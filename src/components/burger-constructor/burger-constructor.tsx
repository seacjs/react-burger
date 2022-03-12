import React, { useContext, useEffect, useReducer, useState } from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './../order-details/order-details';
import PropTypes from 'prop-types';
import ingredientItemPropTypes from '../../utils/ingredient-item-prop-types';
import IngridientsDataContext from "../services/IngridientsDataContext";
import { Ingredient } from "../model/ingredient";
import { cartData } from "../services/cartContext";
import ConstructorDataContext from "../services/constructorDataContext";

const sentOrderUrl = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor(props: any){

  const ingredientData = useContext(IngridientsDataContext) as Ingredient[];
  const [orderOpen, setOrderOpen] = useState(false);

  const [orderData, setOrderData] = useState(null);
  const [cartState, dispatchCart] = useContext(ConstructorDataContext);

  // Открыть окно заказа
  const openOrder = () => {
    let ingredients: any[] = [];
    cartState.items.forEach((item: Ingredient) => {
      ingredients.push(item._id);
    });
    
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
     },
      body: JSON.stringify({"ingredients": ingredients})
    };

    // todo: добавить http класс для отправки и обработки запросов
    fetch(sentOrderUrl, options as any)
      .then(res => {
        if (!res.ok) {
          throw new Error('ошибка ' + res.status);
        }
        return res.json();
      })
      .then((json: any) =>   {
        if (!json.success) {
          throw new Error('ошибка');
        }
        console.log('json', json);
        setOrderData({
          name: json.name,
          number: json.order.number
        } as any)
        setOrderOpen(true);
      })
      .catch((error) => {
        console.error('Что то пошло не так... :(', error);
      })

  }
  const closeOrder = () => {
    setOrderOpen(false);
  }

  const initCart = (ingredients: Ingredient[]): void => {
    let oneBunFinded = false;
    ingredients = ingredients.filter(item => {
      if (item.type !== 'bun' || !oneBunFinded) {
        if (item.type === 'bun') {
          oneBunFinded = true;
        }
        return true;
      }
      return false;
    });
    dispatchCart(ingredients);
  }
  const clearCart = (): void => {
    dispatchCart([]);
  }
  const addItemToCart = (ingredient: Ingredient): void => {
    // todo: проверить что бы булка была только одна
    const items = [...cartState.items];
    items.push(ingredient);
    dispatchCart(items);
  }
  const removeItemFromCart = (itemPosition: number): void => {
    const items = [...cartState.items];
    items.splice(itemPosition, 1);
    dispatchCart(items);
  }

  useEffect(() => {
    initCart(ingredientData);
  }, [ingredientData]);

  return (
    <React.Fragment>
      { ingredientData.length > 0 ?
      <div className={styles.wrapMiddleInner}>
        <div className={styles.wrap + ' ' +styles.wrapTop}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={ingredientData[0].name + ' (верх)'}
              price={ingredientData[0].price}
              thumbnail={ingredientData[0].image}
            />
        </div>
        <div className={styles.wrapMiddle+ " mt-4 mb-4"} >
          {
            ingredientData.filter((item: any)=> item.type !== 'bun').map((cnstructorElement:any )=> {
              return (
                <div key={cnstructorElement._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={cnstructorElement.name}
                    price={cnstructorElement.price}
                    thumbnail={cnstructorElement.image}
                  />
                </div>
              )
            })
          }
        </div>
        <div className={styles.wrap + ' ' +styles.wrapBottom}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={ingredientData[0].name + ' (низ)'}
              price={ingredientData[0].price}
              thumbnail={ingredientData[0].image}
            />
        </div>
      </div>
      : '' }

      <div className={styles.priceBlock + ' mt-10'}>
        <div className="text text_type_digits-medium">
          <span>{cartState.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div>
        <Button type="primary" size="large" onClick={openOrder}>Оформить заказ</Button>
        </div>
      </div>

      <Modal isOpen={orderOpen} title={''} onClose={closeOrder}>
        <OrderDetails order={orderData} />
      </Modal>
    </React.Fragment>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientItemPropTypes)
}

export default BurgerConstructor