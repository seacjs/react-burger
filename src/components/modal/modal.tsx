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
  isOpen: boolean
}

function Modal(props: propType) {

  const {onClose, title, children} = props;

  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen])

  return ReactDOM.createPortal (
    <>
      <div className={styles.modal + ' ' + ( isOpen === true ? styles.isOpen : '')}>
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
