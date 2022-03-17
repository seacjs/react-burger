import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css';
import {CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals") as Element;

interface propType {
  children: any,
  title: string,
  onClose: any,
  isOpen: boolean,
  type: string
}

function Modal(props: propType) {

  const {onClose, title, children, isOpen, type} = props;

  const close = () => {
    // document.removeEventListener("keydown", handleEscapeKey, false);
    props.onClose();
  }

  const handleEscapeKey = (event: any) => {
    if(isOpen && event.key === "Escape") {
      close();
    }
  }

  useEffect(() => {
    isOpen && document.addEventListener("keydown", handleEscapeKey, false);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey, false);
    }
  }, [isOpen === true]);

  return ReactDOM.createPortal (
    <>
      {/* todo: refactor */}
      <div className={styles.modal +' ' + (type ==='order' ? styles.modalOrder : styles.modalIngredient) + ' ' + ( isOpen === true ? styles.isOpen : '')}>
        <div className={styles.modalHeader + ' text text_type_main-large'}>
          <CloseIcon onClick={onClose} type="primary" />
          {title}
        </div>
        {children}
      </div>
      <ModalOverlay isOpen={isOpen} onClose={onClose} />
    </>,
    modalRoot
  );
}

export default Modal;
