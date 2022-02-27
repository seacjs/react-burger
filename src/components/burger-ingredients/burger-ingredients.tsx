import React, { useEffect, useState } from "react";
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from './ingredient-element/ingredient-element';
import styles from './burger-ingrediends.module.css';
import PropTypes from 'prop-types';

function BurgerIngredients(props: any) {

  const state = {
    tabs: ['Булки','Соусы','Начинки'],
    types: ['bun','sauce','main'],
    current: 0,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data])

  const setCurrent = (): any => {
    //todo: o second sprint
  }

  return (
    <React.Fragment>
      {/* TITLE */}
      <p className="pt-10 pb-5 align-left text text_type_main-large">Соберите бургер</p>
      {/* TABS */}
      <div className={styles.tabs}>
        {
          state.tabs.map((tab, index) => {
            return (
              <Tab key={index} value="one" active={state.current === index} onClick={setCurrent}>
                {tab}
              </Tab>
            )
          })
        }
      </div>
      {/* INGRIDIENTS CONTAINER */}
      <div className={styles.ingridientsContainer + ' mt-10'}>
        {
          state.tabs.map((tab, index) => {
            return (
              <React.Fragment key={index}>
                <p className="align-left text text_type_main-medium">{tab}</p>
                <div className={styles.ingridientElementWrap}>
                  {
                    data.filter((item: any) => item.type === state.types[index]).map((ingridient: any, ingridientIndex: number) => {
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
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients;