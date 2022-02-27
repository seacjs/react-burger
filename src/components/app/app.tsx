import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className="left">
          <BurgerIngredients />
        </section>
        <section className="right mt-25">
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}


export default App;
