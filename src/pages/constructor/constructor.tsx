import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useDispatch } from "react-redux";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"
import styles from './constructor.module.css';
// import {setTitle} from "../../services/reducers/appReducer";

type propsPage = {
  pageTitle?: string;
}

function Constructor(props: propsPage) {
  const {pageTitle} = props;

  const dispatch = useDispatch();

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.left}>
        <BurgerIngredients />
      </section>
      <section className={styles.right + ' mt-25'}>
        <BurgerConstructor />
      </section>
    </DndProvider>
  )
}

export default Constructor