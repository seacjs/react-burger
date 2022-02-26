import React from "react";
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from './ingredient-element/ingredient-element';
import {data} from '../../utils/data';
import styles from './burger-ingrediends.module.css';

const burgerIngredients = class BurgerIngredients  extends React.Component {

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
        <div className={styles.tabs}>
          {
            this.state.tabs.map((tab, index) => {
              return (
                <Tab key={index} value="one" active={this.state.current === index} onClick={this.setCurrent}>
                  {tab}
                </Tab>
              )
            })
          }
        </div>
        {/* INGRIDIENTS CONTAINER */}
        <div className={styles.ingridientsContainer + ' mt-10'}>
          {
            this.state.tabs.map((tab, index) => {
              return (
                <React.Fragment key={index}>
                  <p className="align-left text text_type_main-medium">{tab}</p>
                  <div className={styles.ingridientElementWrap}>
                    {
                      data.filter(item => item.type === this.state.types[index]).map((ingridient, ingridientIndex) => {
                        return (
                          <IngredientElement key={index+ '_' + ingridientIndex} 
                            name={ingridient.name} 
                            price={ingridient.price} 
                            image={ingridient.image} 
                          />
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

export default burgerIngredients;