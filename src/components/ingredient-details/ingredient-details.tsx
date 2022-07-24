import { FC } from 'react';
import { useSelector } from '../../hooks/hooks';
import styles from './ingredient-details.module.css'

const IngredientDetails: FC = () => {
  const ingredient = useSelector(store => store.ingredientDetail.ingredient);

  const energyМalues = ['calories', 'proteins', 'fat', 'carbohydrates'];
  const energyМaluesNames = ['Калории,ккал', 'Белки, г', 'Жиры, г', 'Углеводы, г'];

  return (
    <>
    <div className={styles.wrap}>
      <div className={styles.image}>
        <img className={styles.img} src={ingredient?.image} alt={ingredient?.name} />
      </div>
      <div className={styles.name + ' mt-4 mb-8 text text_type_main-medium'}>{ingredient?.name}</div>
      <div className={styles.energyМalue}>
        {ingredient ? 
          energyМalues.map((item, index) => {
            return (
              <div key={index} className={styles.energyМalueItem}>
                <div className={'text text_type_main-default text_color_inactive'}>{energyМaluesNames[index]}</div>
                <div className={'text text_type_main-default text_type_main-medium text_color_inactive'}>{ingredient[item as 'calories' |'proteins' | 'fat' |'carbohydrates']}</div>
              </div>
            )
          })
        : ''}
      </div>
    </div>
    </>
  );
}

export default IngredientDetails;
