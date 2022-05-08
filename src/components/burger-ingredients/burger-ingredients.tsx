import React, { useEffect, useReducer, useRef } from "react";
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from './ingredient-element/ingredient-element';
import styles from './burger-ingrediends.module.css';
import { useSelector } from "react-redux";
import { Ingredient } from "../../model/ingredient";
import { Link, useLocation } from "react-router-dom";

function BurgerIngredients() {

  const ingredientData = useSelector((store: any) => store.ingredients.items);
  const location = useLocation();

  // TABS START
  const initialTabState = {
    tabs: ['Булки','Соусы','Начинки'],
    types: ['bun','sauce','main'],
    currentTab: 0,
  }
  function reducer(state: any, action: number) {
    return {
      ...state,
      currentTab: +action
    }
  }
  const [tabState, dispatch] = useReducer(reducer, initialTabState);
  const setCurrentTab = ($event: string): void => {
    const index = tabState.types.findIndex((item: string) => item === $event);
    dispatch(index);
  }
  // TABS END 

  const ingridientsContainerRef = useRef(null);

  const bunSectionRef = useRef(null);
  const sauceSectionRef = useRef(null);
  const mainSectionRef = useRef(null);
  
  const tabRefs = [
    bunSectionRef,
    sauceSectionRef,
    mainSectionRef
  ];

  const trackScroll = (e: any) => {
    const  scrollTop = e.target.getBoundingClientRect().top;
    if (
      bunSectionRef && bunSectionRef.current &&
      sauceSectionRef && sauceSectionRef.current &&
      mainSectionRef && mainSectionRef.current 
    ) {
      const bunSectionVal = Math.abs((bunSectionRef.current as HTMLElement).getBoundingClientRect().top - scrollTop);
      const sauceSectionVal = Math.abs((sauceSectionRef.current as HTMLElement).getBoundingClientRect().top - scrollTop);
      const mainSectionVal = Math.abs((mainSectionRef.current as HTMLElement).getBoundingClientRect().top - scrollTop);

      const minValue = Math.min(bunSectionVal, sauceSectionVal, mainSectionVal);
      switch (minValue) {
        case bunSectionVal: {
          return setCurrentTab('bun');
        }
        case sauceSectionVal: {
          return setCurrentTab('sauce');
        }
        case mainSectionVal: {
          return setCurrentTab('main');
        }
        default:
          return setCurrentTab('bun');
      }

    }
  }
  // todo: need refactor...

  useEffect(() => {
    if (ingridientsContainerRef && ingridientsContainerRef.current) {
      (ingridientsContainerRef.current as HTMLElement).addEventListener('scroll', trackScroll);
    }
    return () => {
      if (ingridientsContainerRef && ingridientsContainerRef.current) {
        (ingridientsContainerRef.current as HTMLElement).removeEventListener("scroll", trackScroll);
      }
    }
  },[]);

  return (
    <React.Fragment>
      {/* TITLE */}
      <p className="pt-10 pb-5 align-left text text_type_main-large">Соберите бургер</p>
      {/* TABS */}
      <div className={styles.tabs}>
        {
          tabState.tabs.map((tab: string, index: number) => {
            return (
              <Tab key={tabState.types[index]} value={tabState.types[index]} active={tabState.currentTab === index} onClick={setCurrentTab}>
                {tab}
              </Tab>
            )
          })
        }
      </div>
      {/* INGRIDIENTS CONTAINER */}
      <div className={styles.ingridientsContainer + ' mt-10'} ref={ingridientsContainerRef}>
        {
          tabState.tabs.map((tab: string, index: number) => {
            return (
              <React.Fragment key={tabState.types[index]}>
                <p className="align-left text text_type_main-medium" ref={tabRefs[index]}>{tab}</p>
                <div className={styles.ingridientElementWrap}>
                  {
                    ingredientData.filter((item: Ingredient) => item.type === tabState.types[index]).map((ingridient: Ingredient, ingridientIndex: number) => {
                      return (
                        // <Link
                        // key={ingridient._id}
                        // to={'ingredients/'+ingridient._id}
                        // state={{backgroundLocation: location}}
                        // >
                          <IngredientElement key={ingridient._id} ingridient={ingridient}/>
                        // </Link>
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

export default BurgerIngredients;