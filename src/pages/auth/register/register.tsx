import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PagePropsType } from '../../../model/page-props-type';
import { getRegister } from '../../../services/actions/authAction';
import AuthBase from '../auth-base';

const Register: FC<PagePropsType> = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setЗassword] = useState<string>('');

    const onClick = () => {
        dispatch(getRegister(name, email, password));
    };

    return (
        <>
            <AuthBase title={'Регистрация'} submit={onClick}>
                <Input
                    type={'text'}
                    value={name}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    name={'email'}
                    error={false}
                />

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
                
                <Button type="primary" size="medium">Зарегистрироваться</Button>

                <div className="mt-20">
                    <div>Уже зарегистрированы? 
                        <Link to={'/login'}><Button type="secondary" size="medium">Войти</Button></Link>
                    </div>
                </div>
            </AuthBase>


        </>

    );
}

export default Register;