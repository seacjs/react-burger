import { Button, Input, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import { getLogout, getUpdate } from '../../services/actions/authAction';
import { wsClose, wsInit } from '../../services/actions/wsOrderAction';
import { getCookie } from '../../utils/cookie';
import styles from './profile-orders.module.css';
import {v4 as uuidv4} from 'uuid';
import { hideFeedOrderDetail } from '../../services/actions/feedOrderDetailActions';
import { useNavigate } from 'react-router-dom';
import FeedOrderDetail from '../../components/feed-order-detail/feed-order-detail';
import Modal from '../../components/modal/modal';
import { RootState } from '../../services/reducers/rootReducer';
import { useDispatch, useSelector } from '../../hooks/hooks';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

type PagePropsType = {
    pageTitle?: string;
}

const ProfileOrders: FC<PagePropsType> = () => {

    const TAB_PROFILE: string = 'profile';
    const TAB_ORDERS: string = 'orders';
    const [current, setCurrent] = useState(TAB_ORDERS);
    const navigate = useNavigate();
    
    // user data
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(getLogout());
    }

    // orders
    const feedOrderDetail = useSelector(store => store.feedOrderDetail);
    const wsOrders = useSelector(store => store.wsOrders); // feedOrders {orders , total, totalToday }
    const {orders, total, totalToday} = wsOrders;

    useEffect(() => {
        if (current === TAB_PROFILE) {
            navigate('/profile');
        }
        const accessToken = (getCookie('accessToken') as string).replace('Bearer ', '');
        const url = accessToken ? `${wsUrl}?token=${accessToken}` : wsUrl;
        dispatch(wsInit(url));
        return () => {
            dispatch(wsClose());
        }
    },[current]);

    const closeDetail = () => {
        dispatch(hideFeedOrderDetail());
        navigate('/profile/orders');
    }

    return (
        <>
            <div className={styles.profileContent + ' pl-5 pt-30'}>
                <div className={styles.links}>
                    <Tab value={TAB_PROFILE} active={false} onClick={setCurrent}>
                        Профилоь
                    </Tab>
                    <Tab value={TAB_ORDERS} active={true} onClick={setCurrent}>
                        История заказов
                    </Tab>
                    <Tab value="three" active={false} onClick={logout}>
                        Выход
                    </Tab>

                    <div className="mt-20"> </div>
                </div>
            
                    <div className={styles.ordersContainer + ' pr-2'}>
                        {
                            
                            orders && 
                            orders.map((order) => {
                                return (
                                    <OrderItem key={uuidv4()} order={order} profile={true} />
                                )
                            })
                        }
                    </div>
            </div>
            
            <Modal isOpen={feedOrderDetail.isOpen} title={'#'+feedOrderDetail?.order?.number} onClose={closeDetail} type={'feedOrder'}>
                <FeedOrderDetail />
            </Modal>

        </>
    );
}
export default ProfileOrders;