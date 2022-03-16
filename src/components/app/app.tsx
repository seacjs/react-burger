import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect } from 'react';
import styles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredinets } from '../../services/actions/ingredientsAction';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredinets());
  }, []);

  const ingredientData = useSelector((store: any) => store.ingredients.items);
  
  return (
    <div className={styles.App}>
      <AppHeader />
      <main>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.left}>
          <BurgerIngredients />
        </section>
        <section className={styles.right + ' mt-25'}>
          <BurgerConstructor />
        </section>
      </DndProvider>
      </main>
    </div>
  );
}

export default App;
