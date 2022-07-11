import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css';
import {CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals") as Element;

interface IModalPropType {
  title: string,
  onClose: () => void,
  isOpen: boolean,
  type: string
}

const Modal: FC<IModalPropType> = ({onClose, title, children, isOpen, type} ) => {

  const close = () => {
    onClose();
  }

  const handleEscapeKey = (event: KeyboardEvent) => {
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
      <div className={styles.modal +' ' + (type ==='order' ?  styles.modalOrder : (type === 'feedOrder' ? styles.modalFeedOrder :  styles.modalIngredient)) + ' ' + ( isOpen === true ? styles.isOpen : '')}>
        <div className={styles.modalHeader + (type === 'feedOrder' ? ' text text_type_digits-default' :' text text_type_main-large')}>
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
