import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../model/ingredient';
import { TOrder } from '../types/order';
import styles from './feed-order-detail.module.css';
import {v4 as uuidv4} from 'uuid';

const FeedOrderDetail: FC = () => {

    const {order} = useSelector((store: any) => store.feedOrderDetail);


    const ingredientData = useSelector((store: any) => store.ingredients.items);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        let ing: Ingredient[] = [];
        let price = 0;
        order.ingredients.forEach((id: string) => {
            const findedIngredient = ingredientData.find((i: Ingredient) => i._id === id);
            if (findedIngredient) {
                ing.push(findedIngredient);
                price += findedIngredient.price;
            }
        })

        setIngredients(ing);
        setTotalPrice(price);
    },[order]);

    return (
        <>
            { order && (
                <>
                    <div className={styles.orderName + ' mt-10 mb-3 text text_type_main-medium'}>{order.name}</div>
                    <div className={styles.status +' mb-15'}>{order.status}</div>
                    <div className='mb-6 text text_type_main-medium'>Состав:</div>
                    <div className={styles.ingredientsContainer + ' pr-6 mb-10'}>
                        {
                            ingredients.map((ingredient: Ingredient) => {
                                return (
                                    <div key={ uuidv4()} className={styles.ingredientsContainerItem + ' pb-4'}>
                                        <div className={styles.imgAndName}>
                                            <img className={styles.orderItemIngredientImage} src={ingredient.image} alt="" />
                                            <div className='pr-4 pl-4  text text_type_main-default'>{ingredient.name}</div>
                                        </div>
                                        <div className={styles.price}>
                                            <span className='pr-4'>{ingredient.type === 'bun' ? '2' : '1'} x {ingredient.price}</span> <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.orderItemDate}>{order.updatedAt}</div>
                        <div className={styles.price}>
                            <span className='pr-4 pl-6 text text_type_digits-default'>{totalPrice}</span> <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </>
            )}
            
        </>
    )

}

export default FeedOrderDetail;