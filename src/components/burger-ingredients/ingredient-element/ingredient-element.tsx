import React from "react";
import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';
import PropTypes from 'prop-types';

export default class IngredientElement  extends React.Component<any, any> {

  static propTypes = {
    count: PropTypes.number,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  };

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className={styles.card + ' mt-6 mb-10 align-center'}>
          {
            this.props.count ?
            <Counter count={this.props.count} size="default" /> :
            ''
          }
          <img src={this.props.image} className={styles.img} alt={this.props.name} />
          <div className={styles.price + ' text text_type_digits-default pt-1 pb-1'}> 
            {this.props.price} <CurrencyIcon type="primary" />
          </div>
          <div className={styles.name}> 
            {this.props.name}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
