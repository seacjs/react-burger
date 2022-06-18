import { Button, Input, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import { getLogout, getUpdate } from '../../services/actions/authAction';
import { wsClose, wsInit } from '../../services/actions/wsOrderAction';
import { getCookie } from '../../utils/cookie';
import styles from './profile.module.css';
import {v4 as uuidv4} from 'uuid';
import { hideFeedOrderDetail } from '../../services/actions/feedOrderDetailActions';
import { useNavigate } from 'react-router-dom';
import FeedOrderDetail from '../../components/feed-order-detail/feed-order-detail';
import Modal from '../../components/modal/modal';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

type PagePropsType = {
    pageTitle?: string;
    tab?: string;
}

const Profile: FC<PagePropsType> = ({tab}) => {

    const feedOrderDetail = useSelector((store: any) => store.feedOrderDetail);
    const [current, setCurrent] = useState(tab ? tab : 'one');
    const navigate = useNavigate();
    // user data
    const {user} = useSelector((store: any) => store.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(getLogout());
    }

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setЗassword] = useState<string>('');

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setЗassword('');
    },[user])

    const update = () => {
        dispatch(getUpdate(name, email, password));
    } 
    const cancel = () => {
        setName(user?.name);
        setEmail(user?.email);
        setЗassword('');
    } 

    // orders
    const wsOrders = useSelector((store: any) => store.wsOrders); //  feedOrders {orders , total, totalToday }
    const {orders, total, totalToday} = wsOrders;

    useEffect(() => {
        const accessToken = (getCookie('accessToken') as string).replace('Bearer ', '');
        const url = accessToken ? `${wsUrl}?token=${accessToken}` : wsUrl;
        dispatch(wsInit(url));
        return () => {
            dispatch(wsClose());
        }
    },[]);

    const closeDetail = () => {
        dispatch(hideFeedOrderDetail());
        navigate('/profile/orders');
    }

    return (
        <>
            <div className={styles.profileContent + ' pl-5 pt-30'}>
                <div className={styles.links}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Профилоь
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        История заказов
                    </Tab>
                    <Tab value="three" active={false} onClick={logout}>
                        Выход
                    </Tab>

                    <div className="mt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </div>
                </div>
                {current === 'one' && (
                    <>
                        <div className={styles.form}>
                        <Input
                            type={'text'}
                            value={name}
                            icon={'EditIcon'}
                            placeholder={'Имя'}
                            onChange={e => setName(e.target.value)}
                            name={'email'}
                            error={false}
                        />

                        <Input
                            type={'email'}
                            value={email}
                            icon={'EditIcon'}
                            placeholder={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            name={'email'}
                            error={false}
                        />

                        <Input
                            type={'password'}
                            value={password}
                            icon={'EditIcon'}
                            placeholder={'Пароль'}
                            onChange={e => setЗassword(e.target.value)}
                            name={'email'}
                            error={false}
                        />

                        {
                            user?.name != name || user?.email != email ? (
                                <div>
                                    <Button type="primary" size="medium" onClick={update}>Сохранить</Button>
                                    <Button type="primary" size="medium" onClick={cancel}>Отменить</Button>
                                </div>
                            ) : ''
                        }
                        </div>
                    </> 
                )}
                {current === 'two' && (
                    <>
                        <div className={styles.ordersContainer + ' pr-2'}>
                            {
                                
                                wsOrders && 
                                orders.map((order: any) => {
                                    return (
                                        <OrderItem key={uuidv4()} order={order} profile={true} />
                                    )
                                })
                            }
                        </div>
                    </>
                )}
            </div>
            
            <Modal isOpen={feedOrderDetail.isOpen} title={'#'+feedOrderDetail?.order?.number} onClose={closeDetail} type={'feedOrder'}>
                <FeedOrderDetail />
            </Modal>

        </>
    );
}
export default Profile;