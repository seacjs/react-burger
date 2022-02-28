import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import styles from './app.module.css';

const urlData = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = useState([]);

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
        setData(json.data);
      })
      .catch((error) => {
        console.error('Что то пошло не так... :(', error);
      })
  }, [])

  return (
    <div className={styles.App}>
      <AppHeader />
      <main>
        <section className={styles.left}>
          <BurgerIngredients data={data} />
        </section>
        <section className={styles.right + ' mt-25'}>
          <BurgerConstructor data={data} />
        </section>
      </main>
    </div>
  );
}


export default App;
