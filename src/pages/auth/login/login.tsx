import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PagePropsType } from '../../../model/page-props-type';
import { getLogin } from '../../../services/actions/authAction';
import AuthBase from '../auth-base';

const Login: FC<PagePropsType> = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setЗassword] = useState<string>('');

    const onClick = () => {
        dispatch(getLogin(email, password));
    };

    return (
        <>
            <AuthBase title={'Вход'} submit={onClick}>

                <Input
                    type={'email'}
                    value={email}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    name={'email'}
                    error={false}
                />

                <Input
                    type={'password'}
                    value={password}
                    icon={'ShowIcon'}
                    placeholder={'Пароль'}
                    onChange={e => setЗassword(e.target.value)}
                    name={'email'}
                    error={false}
                />
                
                <Button type="primary" size="medium">Войти</Button>

                <div className="mt-20">
                    <div>Вы — новый пользователь? 
                        <Link to={'/register'}><Button type="secondary" size="medium">Зарегистрироваться</Button></Link>
                    </div>
                    <div className='mt-4'>Забыли пароль? 
                        <Link to={'/forgot-password'}><Button type="secondary" size="medium">Восстановить пароль</Button></Link>
                    </div>
                </div>
            </AuthBase>

        </>

    );
}

export default Login;