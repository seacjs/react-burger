import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeaderButton from './app-header-button/app-header-button';
import styles from './app-header.module.css';
import { useSelector } from '../../hooks/hooks';

const AppHeader: FC = () => {

  const {user} = useSelector(store => store.auth);
  let [username, setUsername] = useState<string>('');

  useEffect(() => {
    setUsername(user ? user?.name : '');
  },[user]);

  return (
    <header className={styles.header + ' container pt-4 pb-4'}>
      <nav>
      {/* isActive={true} */}
        <Link to={'/'}>
          <AppHeaderButton isActive={true}>
            <BurgerIcon type="primary" /> <span className="pl-2">Конструктор</span>
          </AppHeaderButton>
        </Link>
        <Link to={'/feed'} className={'ml-4'}>
          <AppHeaderButton className={'ml-4'}>
            <ListIcon type="primary" /> <span className="pl-2">Лента заказов</span>
          </AppHeaderButton>
        </Link>
      </nav>
      <Logo />
      <nav>
        <Link to={'/profile'}>
          <AppHeaderButton>
            <ProfileIcon type="primary" /> <span className="pl-2">Личный кабинет {username}</span>
          </AppHeaderButton>
        </Link>

      </nav>
    </header>
  )

}

export default AppHeader;