import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PagePropsType } from '../../../model/page-props-type';
import { FORGOT_PASSWORD, getForgotPassword } from '../../../services/actions/authAction';
import AuthBase from '../auth-base';

const ForgotPassword: FC<PagePropsType> = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const forgotPassword = () => {
        dispatch(getForgotPassword(email));
    }
    const navigate = useNavigate();

    const {forgotPasswordEmailSended} = useSelector((store: any) =>store.auth);

    useEffect(() => {
        dispatch(getForgotPassword(email));
        console.log('forgotPasswordEmailSended', forgotPasswordEmailSended);
        if(forgotPasswordEmailSended) {
            navigate('/reset-password');
        }

    }, [forgotPasswordEmailSended])
    

    return (
        <>
            <AuthBase title={'Восстановление пароля'} submit={forgotPassword}>
       
                <Input
                    type={'email'}
                    value={email}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    name={'email'}
                    error={false}
                />

                <Button type="primary" size="medium">Восстановить</Button>

                <div className="mt-20">
                    
                    <div>Вспомнили пароль? 
                        <Link to={'/login'}><Button type="secondary" size="medium">Войти</Button></Link>
                    </div>
                </div>
            </AuthBase>


        </>

    );
}

export default ForgotPassword;