import React, { useEffect } from 'react';
import styles from './app-header-button.module.css';

function AppHeaderButton(props: any) {

  const [state, setState] = React.useState({
    className: 'pl-5 pr-5 pb-4 pt-4 ' + styles.button,
  });

  useEffect(() => {
    setState({
      ...state,
      className: state.className + ' ' + props.className + ' ' + (props.isActive ? styles.active : '')
    })
  }, [props.isActive])

  return (
    <button className={state.className}>
      {props.children}
    </button>
  )
}

export default AppHeaderButton;