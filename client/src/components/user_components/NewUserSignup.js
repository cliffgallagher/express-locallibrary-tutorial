import React from 'react';
import styles from './NewUserSignup.module.css';

const NewUserSignup = () => {
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <p>Please enter your information below:</p>
                <form className={styles.form}>
                    <label>First Name<input type='text' name='newuserUsername' /></label>
                    <label>Last Name<input type='text' name='newUserPassword' /></label>
                    <div id={styles.button_div}>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewUserSignup;