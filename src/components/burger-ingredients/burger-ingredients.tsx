import React from "react";
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/bun-02.png';
import IngredientElement from './ingredient-element/ingredient-element';

export default class BurgerIngredients  extends React.Component {

  state = {
    tabs: ['Булки','Соусы','Начинки'],
    current: 0,
    ingridients: [
      // булки
      [
        {
          img: image,
          price: 20,
          name: 'Краторная булка N-200i',
          count: 1
        },
        {
          img: image,
          price: 20,
          name: 'Флюоресцентная булка R2-D3',
          count: 0
        }
      ],
      // соусы
      [
        {
          img: image,
          price: 30,
          name: 'Соус Spicy-X',
          count: 0
        },
        {
          img: image,
          price: 30,
          name: 'Соус фирменный Space Sauce',
          count: 0
        },
        {
          img: image,
          price: 30,
          name: 'Соус традиционный галактический',
          count: 1
        }
      ],
      // начинки
      [
        {
          img: image,
          price: 40,
          name: 'Соус традиционный галактический',
          count: 1
        },
        {
          img: image,
          price: 40,
          name: 'Мясо бессмертных моллюсков Protostomia',
          count: 0
        },
        {
          img: image,
          price: 40,
          name: 'Плоды Фалленианского дерева',
          count: 0
        },
        {
          img: image,
          price: 40,
          name: 'Хрустящие минеральные кольца',
          count: 0
        }

      ],
    ]
  }

  setCurrent = (): any => {
    //todo: o second sprint
  }

  render(): React.ReactNode {
    return (
      <React.Fragment>
        {/* TITLE */}
        <p className="pt-10 pb-5 align-left text text_type_main-large">Соберите бургер</p>
        {/* TABS */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {
            this.state.tabs.map((tab, index) => {
              return (
                <Tab value="one" active={this.state.current === index} onClick={this.setCurrent}>
                  {tab}
                </Tab>
              )
            })
          }
        </div>
        {/* INGRIDIENTS CONTAINER */}
        <div style={{  overflowY: 'auto', height: 'calc(100vh - 244px)' }} className={'mt-10'}>
          {
            this.state.tabs.map((tab, index) => {
              return (
                <React.Fragment>
                  <p className="align-left text text_type_main-medium">{tab}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                      this.state.ingridients[index].map((ingridient) => {
                        return (
                          <IngredientElement ingridient={ingridient} />
                        )
                      })
                    }
                  </div>
                </React.Fragment>
              )
            })
          }
        </div>

      </React.Fragment>
    )
  }
}
