import React, { useEffect, useState } from "react";
import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details'

function IngredientElement(props: any) {

  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    setDetailOpen(detailOpen);
  }, [detailOpen])
  
  const openDetail = () => {
    setDetailOpen(true);
  }
  const closeDetail = () => {
    setDetailOpen(false);
  }

  return (
    <React.Fragment>
      <div className={styles.card + ' mt-6 mb-10 align-center'} onClick={openDetail}>
        {
          props.count ?
          <Counter count={props.count} size="default" /> :
          ''
        }
        <img src={props.image} className={styles.img} alt={props.name} />
        <div className={styles.price + ' text text_type_digits-default pt-1 pb-1'}> 
          {props.price} <CurrencyIcon type="primary" />
        </div>
        <div className={styles.name}> 
          {props.name}
        </div>
      </div>
      <Modal isOpen={detailOpen} title={props.name} onClose={closeDetail}>
        <IngredientDetails
          image={props.image}
          name={props.name}
          calories={props.calories}
          proteins={props.proteins}
          fat={props.fat}
          carbohydrates={props.carbohydrates}
        />
      </Modal>
    </React.Fragment>
  )

}

IngredientElement.propTypes =  {
  openModal: PropTypes.func,
  count: PropTypes.number,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
};

export default IngredientElement