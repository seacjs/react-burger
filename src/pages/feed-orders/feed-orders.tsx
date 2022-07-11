import { FC, useEffect, useState } from 'react';
import OrderItem from '../../components/order-item/order-item';
import {v4 as uuidv4} from 'uuid';
import Modal from '../../components/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { hideFeedOrderDetail, showFeedOrderDetail } from '../../services/actions/feedOrderDetailActions';
import FeedOrderDetail from '../../components/feed-order-detail/feed-order-detail';
import { wsInit, wsClose } from './../../services/actions/wsOrderAction';
import { TOrder } from '../../components/types/order';
import { getCookie } from '../../utils/cookie';
import styles from './feed-orders.module.css';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const FeedOrders: FC = () => {
    // mock -> TOrder
    const order = {id: 'id'}
    const items: any[] = [];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const feedOrderDetail = useSelector((store: any) => store.feedOrderDetail);
    const wsOrders = useSelector((store: any) => store.wsOrders); //  feedOrders {orders , total, totalToday }
    const {orders, total, totalToday} = wsOrders;
    let stateLcation = location.state as { backgroundLocation?: Location, from: any, orderId: any };

    useEffect(() => {
        dispatch(wsInit(wsUrl));
        return () => {
            dispatch(wsClose());
        }
    },[]);

    const [doneStatuses, setDoneStatuses] = useState<any[]>([]);
    const [otherStatuses, setOtherStatuses] = useState<any[]>([]);

    useEffect(() => {
        console.log('ws', wsOrders);
        let doneStatusesArray: any[] = [];
        let otherStatusesArray: any[] = [];
        orders.forEach((order: TOrder) => {
            if(order.status === 'done') {
                if(doneStatusesArray.length < 10) {
                    doneStatusesArray.push(order.number);
                }
            } else {
                if(otherStatusesArray.length < 10) {
                    otherStatusesArray.push(order.number);
                }
            }
        });
        setDoneStatuses(doneStatusesArray);
        setOtherStatuses(otherStatusesArray)
    },[orders]);

    const closeDetail = () => {
        dispatch(hideFeedOrderDetail());
        navigate('/feed');
    }
    
    return (
        <div className={styles.pageWrap}>
            <div className='text text_type_main-large pb-10'>Лента заказов</div>
            <div className={styles.flexWrap}>
                <div className={styles.w50}>
                    <div className={styles.ordersContainer + ' pr-2'}>
                        {
                            
                            wsOrders && 
                            orders.map((order: any) => {
                                return (
                                    <OrderItem key={uuidv4()} order={order} />
                                )
                            })
                        }
                    </div>
                </div>
                { wsOrders && (
                    <div className={styles.w50}>
                        <div className={styles.orderNumbersWithStatuses}>
                            <div className={styles.w50}>
                                <div className='text text_type_main-medium pb-6'>Готовы:</div>
                                <div className={styles.ordersNumbers}>
                                    {doneStatuses.map((order) => {
                                        return (
                                            <div key={order}>{order}</div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.w50}>
                                <div className='text text_type_main-medium pb-6'>В работе:</div>
                                <div className={styles.ordersNumbers}>
                                    {otherStatuses.map((order) => {
                                        return (
                                            <div key={order}>{order}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='mt-15'>
                            <div className='text text_type_main-medium'>Выполнено за все время:</div>
                            <div className='text text_type_digits-large'>{totalToday}</div>
                        </div>
                        <div className='mt-15'>
                            <div className='text text_type_main-medium'>Выполнено за все время:</div>
                            <div className='text text_type_digits-large'>{total}</div>
                        </div>
                    </div>
                )}
            </div>



            <Modal isOpen={feedOrderDetail.isOpen} title={'#'+feedOrderDetail?.order?.number} onClose={closeDetail} type={'feedOrder'}>
                <FeedOrderDetail />
            </Modal>
        </div>
    )

}

export default FeedOrders;