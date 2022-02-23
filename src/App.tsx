import React from 'react';
import AppHeader from './components/app-header/app-header';
import './App.css';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <div className="left">
          <BurgerIngredients />
        </div>
        <div className="right mt-25">
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}


export default App;
