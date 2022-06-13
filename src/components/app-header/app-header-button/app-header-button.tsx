import React, { FC, useEffect } from 'react';
import styles from './app-header-button.module.css';

type propsType = {
  isActive?: boolean;
  className?: string;
}

const AppHeaderButton: FC<propsType> = ({isActive, className, children}) => {

  const [state, setState] = React.useState({
    className: 'pl-5 pr-5 pb-4 pt-4 ' + styles.button,
  });

  useEffect(() => {
    setState({
      ...state,
      className: state.className + ' ' + className + ' ' + (isActive ? styles.active : '')
    })
  }, [isActive])

  return (
    <button className={state.className}>
      {children}
    </button>
  )
}

export default AppHeaderButton;