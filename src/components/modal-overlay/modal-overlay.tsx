import { useEffect, useState } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props: any) {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen])

  const isEscape = (event: any) => {
    if(isOpen && event.keyCode === 27) {
      close();
    }
  }

  document.addEventListener("keydown", isEscape, false);

  const close = () => {
    document.removeEventListener("keydown", isEscape, false);
    props.onClose();
  }
  
  return (
    <>
      <div className={styles.modalOverlay + ' ' + (isOpen === true ? styles.isOpen : '')} onClick={close}></div>
    </>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default ModalOverlay;
