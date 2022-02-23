import React from "react";
import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-element.module.css';

export default class IngredientElement  extends React.Component<any, any> {

  render(): React.ReactNode {
    return (
      <React.Fragment>
        <div className={styles.card + ' mt-6 mb-10 align-center'}>
          {
            this.props.ingridient.count ?
            <Counter count={this.props.ingridient.count} size="default" /> :
            ''
          }
          <img src={this.props.ingridient.img} className={styles.img} alt={this.props.ingridient.name} />
          <div className={styles.price + ' text text_type_digits-default pt-1 pb-1'}> 
            {this.props.ingridient.price} <CurrencyIcon type="primary" />
          </div>
          <div className={styles.name}> 
            {this.props.ingridient.name}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
