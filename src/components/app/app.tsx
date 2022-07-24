import AppHeader from '../app-header/app-header';
// import BurgerIngredients from '../burger-ingredients/burger-ingredients';
// import BurgerConstructor from '../burger-constructor/burger-constructor';
import { FC, useEffect } from 'react';
import styles from './app.module.css';
import { getIngredinets } from '../../services/actions/ingredientsAction';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Constructor from '../../pages/constructor/constructor';
import Login from '../../pages/auth/login/login';
import Register from '../../pages/auth/register/register';
import ForgotPassword from '../../pages/auth/forgot-password/forgon-password';
import ResetPassword from '../../pages/auth/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Ingredient from '../../pages/ingredient/Ingredient';
import { getUser } from '../../services/actions/authAction';
import ProtectedRoute from '../protected-route/protected-route';
import FeedOrders from '../../pages/feed-orders/feed-orders';
import FeedOrder from '../../pages/feed-order/feed-order';
import ProfileOrders from '../../pages/profile-orders/profile-orders';

import { useSelector, useDispatch } from '../../hooks/hooks';
import { getCookie } from '../../utils/cookie';

const App: FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredinets());
    dispatch(getUser());
  }, []);

  const ingredientData = useSelector(store => store.ingredients.items);

  const Switcher = () => {

    const {isLogged, forgotPasswordEmailSended} = useSelector(store => store.auth);
    const location = useLocation();
    let state = location.state as { backgroundLocation?: Location, from: any };

    // console.log('App, location: ' , location);
    // For - Check accessToken and refreshToken
    const refreshToken = window.localStorage.getItem('refreshToken');
    const accessToken = getCookie('accessToken') as string;
    console.log('Check accessToken and refreshToken:', refreshToken, accessToken);

    return (
      <>
          <div className={styles.App}>
          <AppHeader />
          <main>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<Constructor pageTitle={'Конструктор бургеров'}/>} />
            <Route path="/login" element={<ProtectedRoute condition={!isLogged} redirectTo={state?.from?.pathname || '/' } element={<Login pageTitle={'Страница авторизации'}/>} />} />
            <Route path="/register" element={<ProtectedRoute condition={!isLogged} redirectTo={'/'} element={<Register pageTitle={'Страница регистрации'}/>} />} />
            <Route path="/forgot-password" element={<ProtectedRoute condition={!isLogged} redirectTo={'/'} element={<ForgotPassword pageTitle={'Страница восстановления пароля'}/>} />} />
            <Route path="/reset-password/:token" element={<ProtectedRoute condition={!isLogged && forgotPasswordEmailSended} redirectTo={isLogged ? "/" :'/forgot-password'} element={<ResetPassword pageTitle={'Страница сброса пароля'}/>} />} />
            <Route path="/reset-password" element={<ProtectedRoute condition={!isLogged && forgotPasswordEmailSended} redirectTo={isLogged ? "/" : '/forgot-password'} element={<ResetPassword pageTitle={'Страница сброса пароля'}/>} />} />
            <Route path="/profile" element={<ProtectedRoute condition={isLogged} redirectTo={'/login'} element={<Profile pageTitle={'Настройки пользователя'}/>} />} />

            <Route path="/ingredients/:id" element={<Ingredient pageTitle={'Страница ингридиента'}/>} />

            <Route path="/feed" element={<FeedOrders/>} />
            <Route path="/feed/:id" element={<FeedOrder pageTitle={'Страница заказа в ленте'}/>} />
            <Route path="/profile/orders" element={<ProtectedRoute condition={isLogged} redirectTo={'/login'} element={<ProfileOrders pageTitle={'Страница истории заказов'}/>} />} />
            <Route path="/profile/orders/:id" element={<ProtectedRoute condition={isLogged} redirectTo={'/login'} element={<ProfileOrders pageTitle={'Страница заказа в истории заказов'}/>} />} />

          </Routes>
          </main>
          </div>
      </>
    );
  }

  return (
    <Router>
      <Switcher />
    </Router>
  );

}

export default App;
