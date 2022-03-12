import React, { useContext, useEffect, useReducer, useState } from "react";
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from './ingredient-element/ingredient-element';
import styles from './burger-ingrediends.module.css';
import PropTypes from 'prop-types';
import ingredientItemPropTypes from '../../utils/ingredient-item-prop-types';
import IngredientsDataContext from '../services/IngridientsDataContext';


function BurgerIngredients(props: any) {

  const ingredientData = useContext(IngredientsDataContext);

  const initialTabState = {
    tabs: ['Булки','Соусы','Начинки'],
    types: ['bun','sauce','main'],
    currentTab: 0,
  }
  function reducer(state: any, action: any) {
    return {
      ...state,
      currentTab: +action
    }
  }
  const [tabState, dispatch] = useReducer(reducer, initialTabState);
  const setCurrentTab = ($event: string): any => {
    dispatch($event);
  }

  return (
    <React.Fragment>
      {/* TITLE */}
      <p className="pt-10 pb-5 align-left text text_type_main-large">Соберите бургер</p>
      {/* TABS */}
      <div className={styles.tabs}>
        {
          tabState.tabs.map((tab: any, index: any) => {
            return (
              <Tab key={index} value={index} active={tabState.currentTab === index} onClick={setCurrentTab}>
                {tab}
              </Tab>
            )
          })
        }
      </div>
      {/* INGRIDIENTS CONTAINER */}
      <div className={styles.ingridientsContainer + ' mt-10'}>
        {
          tabState.tabs.map((tab: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <p className="align-left text text_type_main-medium">{tab}</p>
                <div className={styles.ingridientElementWrap}>
                  {
                    ingredientData.filter((item: any) => item.type === tabState.types[index]).map((ingridient: any, ingridientIndex: number) => {
                      return (
                        <IngredientElement key={index+ '_' + ingridientIndex} 
                          name={ingridient.name} 
                          price={ingridient.price} 
                          image={ingridient.image} 
                          calories={ingridient.calories}
                          proteins={ingridient.proteins}
                          fat={ingridient.fat}
                          carbohydrates={ingridient.carbohydrates}
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

BurgerIngredients.propTypes = {
  ingredientData: PropTypes.arrayOf(ingredientItemPropTypes)
}

export default BurgerIngredients;