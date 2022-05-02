import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppHeaderButton from './app-header-button/app-header-button';
import styles from './app-header.module.css';

function AppHeader() {

  const {islogged, user} = useSelector((store: any) => store.auth);

  const lkLink = (islogged ? '/profile' : '/login');

  return (
    <header className={styles.header + ' container pt-4 pb-4'}>
      <nav>
        <Link to={'/'}>
          <AppHeaderButton isActive={true}>
            <BurgerIcon type="primary" /> <span className="pl-2">Конструктор</span>
          </AppHeaderButton>
        </Link>
        <AppHeaderButton className={'ml-4'}>
          <ListIcon type="primary" /> <span className="pl-2">Лента заказов</span>
        </AppHeaderButton>
      </nav>
      <Logo />
      <nav>
        <Link to={lkLink}>
          <AppHeaderButton>
            <ProfileIcon type="primary" /> <span className="pl-2">Личный кабинет {user ? user.name : ''}</span>
          </AppHeaderButton>
        </Link>

      </nav>
    </header>
  )

}

export default AppHeader;