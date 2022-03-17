import { useEffect, useState } from 'react';
import styles from './modal-overlay.module.css';

interface propType {
  onClose: any;
  isOpen: boolean;
}

function ModalOverlay(props: propType) {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen])

  const close = () => {
    props.onClose();
  }
  
  return (
    <>
      <div className={styles.modalOverlay + ' ' + (isOpen === true ? styles.isOpen : '')} onClick={close}></div>
    </>
  );
}

export default ModalOverlay;
