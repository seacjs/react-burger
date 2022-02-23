import React from "react";
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from './ingredient-element/ingredient-element';
import {data} from '../../utils/data';

export default class BurgerIngredients  extends React.Component {

  state = {
    tabs: ['Булки','Соусы','Начинки'],
    types: ['bun','sauce','main'],
    current: 0,
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
                      data.filter(item => item.type === this.state.types[index]).map((ingridient) => {
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
