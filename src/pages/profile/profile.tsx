import { Input, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogout } from '../../services/actions/authAction';
import styles from './profile.module.css';

function Profile(props: any) {
    const user = useSelector((store: any) => store.auth.user);

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(getLogout());
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setЗassword] = useState('');

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    },[user])

    const setCurrent = () => {} 

    return (
        <>
            <div className={styles.profileContent + ' pl-5 pt-30'}>
                <div className={styles.links}>
                    <Tab value="one" active={ true} onClick={setCurrent}>
                        Профилоь
                    </Tab>
                    <Tab value="two" active={false} onClick={setCurrent}>
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
                </div>
            </div>

        </>
    );
}
export default Profile;