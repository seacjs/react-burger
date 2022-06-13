import { FC, FormEvent } from 'react';
import styles from './auth-base.module.css';

export type TAuthBase = {
    title: string;
    submit: () => void;
}

const AuthBase: FC<TAuthBase> = ({title, submit, children}) => {

    const formSubmit = (event: FormEvent) => {
        if(event) {
            event.preventDefault();
            submit();
        }
    }

    return (
        <>
            <form className={styles.authFormWrap} onSubmit={formSubmit}>
                <div className={styles.authForm}>
                    <div className={styles.title}>{title}</div>
                    {children}
                </div>
            </form>
        </>
    );
}

export default AuthBase;