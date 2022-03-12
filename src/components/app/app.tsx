import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useReducer, useState } from 'react';
import styles from './app.module.css';
import IngredientsDataContext from '../services/IngridientsDataContext';
import { cartData } from '../services/cartContext';
import { Ingredient } from '../model/ingredient';
import ConstructorDataContext from '../services/constructorDataContext';

const urlData = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    fetch(urlData)
      .then(res => {
        if (!res.ok) {
          throw new Error('ошибка ' + res.status);
        }
        return res.json();
      })
      .then((json) =>   {
        if (!json.success) {
          throw new Error('ошибка');
        }
        setIngredientData(json.data);
      })
      .catch((error) => {
        console.error('Что то пошло не так... :(', error);
      })
  }, []);

  const initialСartState: cartData = {
    items: ingredientData,
    totalPrice: 0,
  }
  function cartReducer(state: cartData, action: Ingredient[]): cartData {
    let totalPrice = 0;
    action.forEach((item: any) => {
      totalPrice += item.price;
    });
    return {
      ...state,
      items: action,
      totalPrice: totalPrice
    }
  }
  const resultCartReducer = useReducer(cartReducer, initialСartState);

  return (
    <IngredientsDataContext.Provider value={ingredientData}>
      <ConstructorDataContext.Provider value={resultCartReducer}>
        <div className={styles.App}>
          <AppHeader />
          <main>
            <section className={styles.left}>
              <BurgerIngredients />
            </section>
            <section className={styles.right + ' mt-25'}>
              <BurgerConstructor />
            </section>
          </main>
        </div>
      </ConstructorDataContext.Provider>
    </IngredientsDataContext.Provider>
  );
}

export default App;
