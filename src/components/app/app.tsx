import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

const urlData = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(urlData)
      .then(res => res.json())
      .then((json) =>   {
        setData(json.data);
      })
      .catch((error) => {
        console.error('Что то пошло не так... :(')
      })
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className="left">
          <BurgerIngredients data={data} />
        </section>
        <section className="right mt-25">
          <BurgerConstructor data={data} />
        </section>
      </main>
    </div>
  );
}


export default App;
