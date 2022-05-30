import { Button, Input, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PagePropsType } from '../../model/page-props-type';
import { getLogout, getUpdate } from '../../services/actions/authAction';
import styles from './profile.module.css';

const Profile: FC<PagePropsType> = () => {
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