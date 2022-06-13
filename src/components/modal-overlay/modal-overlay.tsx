import { FC, useEffect, useState } from 'react';
import styles from './modal-overlay.module.css';

interface propType {
  onClose: () => void;
  isOpen: boolean;
}

const  ModalOverlay: FC<propType> = ({onClose, isOpen}) => {

  const [isOpenState, setIsOpenState] = useState<boolean>(false);

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen])

  const close = () => {
    onClose();
  }
  
  return (
    <>
      <div className={styles.modalOverlay + ' ' + (isOpenState === true ? styles.isOpen : '')} onClick={close}></div>
    </>
  );
}

export default ModalOverlay;
