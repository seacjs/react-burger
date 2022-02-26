import React from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import {data} from '../../utils/data';
import styles from './burger-constructor.module.css';

export default class BurgerConstructor  extends React.Component {

  render(): React.ReactNode {
    return (
      <React.Fragment>
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
            data.filter(item => item.type !== 'bun').map(cnstructorElement => {
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
        <div className={styles.priceBlock + ' mt-10'}>
          <div className="text text_type_digits-medium">
            <span>610</span>
            <CurrencyIcon type="primary" />
          </div>
          <div>
          <Button type="primary" size="large">Оформить заказ</Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
