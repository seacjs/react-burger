import { FC } from 'react';
import styles from './auth-base.module.css';

export type TAuthBase = {
    title: string;
}

const AuthBase: FC<TAuthBase> = ({title, children}) => {
    return (
        <>
            <div className={styles.authFormWrap}>
                <div className={styles.authForm}>
                    <div className={styles.title}>{title}</div>
                    {children}
                </div>
            </div>
        </>
    );
}

export default AuthBase;