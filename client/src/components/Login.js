import React from 'react';
import styles from './Login.module.css';

const Login = () => {
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <p>Please log in below</p>
                <form className={styles.form}>
                    <label>Username<input type='text' name='newuserUsername' /></label>
                    <label>Password<input type='text' name='newUserPassword' /></label>
                    <div id={styles.button_div}>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;