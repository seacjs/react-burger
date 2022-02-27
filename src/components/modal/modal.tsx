import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay'
import styles from './modal.module.css';
import {CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals") as Element;

function Modal(props: any) {

  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen])

  return ReactDOM.createPortal (
    <>
      <div className={styles.modal + ' ' + ( isOpen === true ? styles.isOpen : '')}>
        <div className={styles.modalHeader + ' text text_type_main-large'}>
          <CloseIcon onClick={props.onClose} type="primary" />
          {props.title}
        </div>
        {props.children}
      </div>
      <ModalOverlay isOpen={isOpen} onClose={props.onClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default Modal;
