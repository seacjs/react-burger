import styles from './order-details.module.css';
import imageSrc from '../../images/done.png';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const OrderDetails = () => {

  const {order} = useSelector((store: any) => store.order);

  return (
    <>
      { order !== null ? (
          <div className={styles.wrap}>
            <div className={styles.orderNumber + ' text text_type_digits-large'}>{order.number}</div> 
            <div className={styles.description + ' mt-8 mb-15 text text_type_main-medium'}>идентификатор заказа</div> 
            <div className={styles.iconDone + ' mb-15'}>
              <img src={imageSrc} alt={'Ваш заказ начали готовить'} />
            </div> 
            <div className={styles.status + ' mb-2'}>Ваш заказ начали готовить</div> 
            <div className={styles.hint + ' text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</div> 
          </div>
        ) : ''
      }
    </>
  );
}

export default OrderDetails;
