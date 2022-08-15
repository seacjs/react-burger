import { FC, useEffect, useState } from 'react';
import { Ingredient } from '../../model/ingredient';
import styles from './order-item.module.css';
import {v4 as uuidv4} from 'uuid';
import { TOrder } from '../types/order';
import { hideFeedOrderDetail, showFeedOrderDetail } from '../../services/actions/feedOrderDetailActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../hooks/hooks';


type propType = {
    order: TOrder;
    profile?: boolean;
}

const OrderItem: FC<propType>  = ({order, profile}) => {
    console.log('А ну ка, кто тут у нас? Авторизованый?',profile);

    const maxIngredientCount = 6;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const {isOpen} = useSelector(store=> store.feedOrderDetail);
    let stateLcation = location.state as { backgroundLocation?: Location, from: any, orderId: any };
    const openDetail = () => {
        console.log('open');
        const nav = !profile ? `/feed/${order.number}` : `/profile/orders/${order.number}`;
        navigate( nav, {state: { backgroundLocation: location, orderId: order.number}});
        dispatch(showFeedOrderDetail(order, true));
    }

    const ingredientData = useSelector(store => store.ingredients.items);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    
    useEffect(() => {
        console.log('О божечки, что происходит!?!');

        if(stateLcation && (stateLcation?.backgroundLocation?.pathname !== location?.pathname)) {
        console.log('location',  stateLcation, order.number, stateLcation?.orderId === order.number);

            if(stateLcation?.orderId === order.number) {
                console.log('isOpen',  isOpen);
                if(!isOpen) {
                    dispatch(showFeedOrderDetail(order, true));
                }
            }
        }

        let ing: Ingredient[] = [];
        let price = 0;
        order.ingredients.forEach(id => {
            const findedIngredient = ingredientData.find((i: Ingredient) => i._id === id);
            if (findedIngredient) {
                ing.push(findedIngredient);
                price += findedIngredient.price * (findedIngredient.type === 'bun' ?  2  : 1);
            }
        })
        setIngredients(ing);
        setTotalPrice(price);
    },[isOpen]);

    return (
        <div className={styles.orderItem + ' pt-6 pb-6 pl-6 pr-6 mb-4'} onClick={openDetail}>
            <div className={styles.orderItemHeader + ' pb-6'}>
                <div className='text text_type_digits-default'>#{order.number}</div> 
                <div className={'text text_type_main-default '+styles.orderItemDate}>{order.updatedAt}</div>
            </div>
            <div className='pb-6 text text_type_main-medium'>{order.name}</div>
            <div className={styles.orderItemBottom}>
                <div className={styles.orderItemIngredients}>
                    {
                        ingredients.map((ingredient: Ingredient, index: number) => {
                            return (
                                <div key={ uuidv4()}>
                                    { index < maxIngredientCount && (
                                        <div  className={styles.orderItemIngredient}>
                                            <img className={styles.orderItemIngredientImage} src={ingredient.image} alt="" />
                                            {index + 1 === maxIngredientCount && ingredients.length > maxIngredientCount && <div className={styles.last}>+{ingredients.length - maxIngredientCount}</div>}
                                        </div>
                                        )
                                    }
                                </div>
               
                            )
                        })
                    }
                </div>
                <div className={styles.orderItemBottomPrice + ' pl-6 text text_type_digits-default'}>
                    <span className='pr-4'>{totalPrice}</span> <CurrencyIcon type="primary" />
                </div>

            </div>

        </div>

    )

}

export default OrderItem;