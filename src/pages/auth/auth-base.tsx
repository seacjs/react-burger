import styles from './auth-base.module.css';


function AuthBase(props: any) {
    const {title, children} = props;
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