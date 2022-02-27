import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';

function IngredientDetails(props: any) {

  const energyМalues = ['calories', 'proteins', 'fat', 'carbohydrates'];
  const energyМaluesNames = ['Калории,ккал', 'Белки, г', 'Жиры, г', 'Углеводы, г'];

  return (
    <>
    <div className={styles.wrap}>
      <div className={styles.image}>
        <img className={styles.img} src={props.image} alt={props.name} />
      </div>
      <div className={styles.name + ' mt-4 mb-8 text text_type_main-medium'}>{props.name}</div>
      <div className={styles.energyМalue}>
        {
          energyМalues.map((item, index) => {
            return (
              <div key={index} className={styles.energyМalueItem}>
                <div className={'text text_type_main-default text_color_inactive'}>{energyМaluesNames[index]}</div>
                <div className={'text text_type_main-default text_type_main-medium text_color_inactive'}>{props[item]}</div>
              </div>
            )
          })
        }
      </div>
    </div>
    </>
  );
}

IngredientDetails.propTypes =  {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
};

export default IngredientDetails;
