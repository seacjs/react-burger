import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderButton from './app-header-button/app-header-button';
import styles from './app-header.module.css';

function AppHeader() {

  const navigate = () => {
    // todo: after we get routing
  }

  return (
    <header className={styles.header + ' container pt-4 pb-4'}>
      <nav>
        <AppHeaderButton isActive={true} onClick={navigate}>
          <BurgerIcon type="primary" /> <span className="pl-2">Конструктор</span>
        </AppHeaderButton>
        <AppHeaderButton className={'ml-4'} onClick={navigate}>
          <ListIcon type="primary" /> <span className="pl-2">Лента заказов</span>
        </AppHeaderButton>
      </nav>
      <Logo />
      <nav>
        <AppHeaderButton onClick={navigate}>
          <ProfileIcon type="primary" /> <span className="pl-2">Личный кабинет</span>
        </AppHeaderButton>
      </nav>
    </header>
  )

}

export default AppHeader;