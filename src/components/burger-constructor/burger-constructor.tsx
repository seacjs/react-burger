import React from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/bun-02.png';

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
              text={this.state.wrapCnstructorElement.name}
              price={this.state.wrapCnstructorElement.price}
              thumbnail={this.state.wrapCnstructorElement.img}
            />
          </div>
        </div>
        <div className="mt-4 mb-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', overflowY: 'scroll' }}>
          {
            this.state.constructorElements.map(cnstructorElement => {
              return <div className="wrap ml-4">
                <span style={{width: '32px', display: 'inline-block'}}>
                  <DragIcon type="primary" />
                </span>
                <ConstructorElement
                  text={cnstructorElement.name}
                  price={cnstructorElement.price}
                  thumbnail={cnstructorElement.img}
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
              text={this.state.wrapCnstructorElement.name}
              price={this.state.wrapCnstructorElement.price}
              thumbnail={this.state.wrapCnstructorElement.img}
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
