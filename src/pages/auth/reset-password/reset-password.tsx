import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getResetPassword } from '../../../services/actions/authAction';
import AuthBase from '../auth-base';

function ResetPassword(props: any) {

    const params = useParams();

    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const {resetPasswordSuccess} = useSelector((store: any) => store.auth);
    const navigate = useNavigate();

    const resetPassword = () => {
        dispatch(getResetPassword(password, token));
    }

    useEffect(()=>{
        if(params && params.token) {
            setToken(params.token);
        }
        if(resetPasswordSuccess) {
            navigate('/login');
        }
    }, [resetPasswordSuccess])

    return (
        <>
            <AuthBase title={'Восстановление пароля'}>
       
                <Input
                    type={'password'}
                    value={password}
                    icon={'ShowIcon'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setPassword(e.target.value)}
                    name={'email'}
                    error={false}
                />

                <Input
                    type={'text'}
                    value={token}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    name={'email'}
                    error={false}
                />
                
                <Button type="primary" size="medium" onClick={resetPassword}>Сохранить</Button>

                <div className="mt-20">
                    <div>Вспомнили пароль? 
                    <Link to={'/login'}><Button type="secondary" size="medium" >Войти</Button></Link>
                    </div>
                </div>
            </AuthBase>


        </>

    );
}

export default ResetPassword;