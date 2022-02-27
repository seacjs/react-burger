import React, { useEffect, useState } from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from './../order-details/order-details';
import PropTypes from 'prop-types';

function BurgerConstructor(props: any){

  const [data, setData] = useState([] as any[]);
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    setData(props.data);
  }, [props.data, orderOpen])

  const openOrder = () => {
    setOrderOpen(true);
  }
  const closeOrder = () => {
    setOrderOpen(false);
  }


  return (
    <React.Fragment>
      { data.length > 0 ?
      <div className={styles.wrapMiddleInner}>
        <div className={styles.wrap + ' ' +styles.wrapTop}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={data[0].name + ' (верх)'}
              price={data[0].price}
              thumbnail={data[0].image}
            />
        </div>
        <div className={styles.wrapMiddle+ " mt-4 mb-4"} >
          {
            data.filter((item: any)=> item.type !== 'bun').map((cnstructorElement:any )=> {
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
              text={data[0].name + ' (низ)'}
              price={data[0].price}
              thumbnail={data[0].image}
            />
        </div>
      </div>
      : '' }

      <div className={styles.priceBlock + ' mt-10'}>
        <div className="text text_type_digits-medium">
          <span>610</span>
          <CurrencyIcon type="primary" />
        </div>
        <div>
        <Button type="primary" size="large" onClick={openOrder}>Оформить заказ</Button>
        </div>
      </div>

      <Modal isOpen={orderOpen} title={''} onClose={closeOrder}>
        <OrderDetails />
      </Modal>
    </React.Fragment>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor