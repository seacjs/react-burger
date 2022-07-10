import { Button, Input, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLogout, getUpdate } from '../../services/actions/authAction';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';

type PagePropsType = {
    pageTitle?: string;
}

const Profile: FC<PagePropsType> = () => {

    const TAB_PROFILE: string = 'profile';
    const TAB_ORDERS: string = 'orders';

    const [current, setCurrent] = useState(TAB_PROFILE);
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

    useEffect(() => {
        if (current === TAB_ORDERS) {
            navigate('/profile/orders');
        }
    },[current]);

    return (
        <>
            <div className={styles.profileContent + ' pl-5 pt-30'}>
                <div className={styles.links}>
                    <Tab value={TAB_PROFILE} active={true} onClick={setCurrent}>
                        Профилоь
                    </Tab>
                    <Tab value={TAB_ORDERS} active={false} onClick={setCurrent}>
                        История заказов
                    </Tab>
                    <Tab value="three" active={false} onClick={logout}>
                        Выход
                    </Tab>

                    <div className="mt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </div>
                </div>
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
 
            </div>
        

        </>
    );
}
export default Profile;