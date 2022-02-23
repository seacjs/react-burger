import React from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/bun-02.png';
import {data} from '../../utils/data';

export default class BurgerConstructor  extends React.Component {

  state = {
    wrapCnstructorElement: {
      name: 'Краторная булка N-200i (низ)',
      price: 20,
      img: image
    },
    constructorElements: [
      {
        name: 'Краторная булка N-200i (низ)',
        price: 20,
        img: image
      },
      {
        name: 'Краторная булка N-200i (низ)',
        price: 20,
        img: image
      },
      {
        name: 'Краторная булка N-200i (низ)',
        price: 20,
        img: image
      },
      {
          name: 'Краторная булка N-200i (низ)',
          price: 20,
          img: image
      },
      {
        name: 'Краторная булка N-200i (низ)',
        price: 20,
        img: image
      },
      {
        name: 'Краторная булка N-200i (низ)',
        price: 20,
        img: image
      }
    ]
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <div className="wrap ml-4">
            <span style={{width: '32px', display: 'inline-block'}}></span>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={data[0].name}
              price={data[0].price}
              thumbnail={data[0].image}
            />
          </div>
        </div>
        <div className="mt-4 mb-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', overflowY: 'scroll', height: '650px' }}>
          {
            data.filter(item => item.type !== 'bun').map(cnstructorElement => {
              return <div className="wrap ml-4">
                <span style={{width: '32px', display: 'inline-block'}}>
                  <DragIcon type="primary" />
                </span>
                <ConstructorElement
                  text={cnstructorElement.name}
                  price={cnstructorElement.price}
                  thumbnail={cnstructorElement.image}
                />
              </div>

            })
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <div className="wrap ml-4">
            <span style={{width: '32px', display: 'inline-block'}}></span>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={data[0].name}
              price={data[0].price}
              thumbnail={data[0].image}
            />
          </div>
        </div>
        <div className="mt-10" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: '40px'}}>
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
