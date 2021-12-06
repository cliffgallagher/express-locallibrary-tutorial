import React from 'react';
import styles from './UserInfoForm.module.css';

const UserInfoForm = (props) => {
    
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <p>User Information:</p>
                <form className={styles.form}>
                    <label>First Name<input type='text' name='newuserUsername' /></label>
                    <label>Last Name<input type='text' name='newUserPassword' /></label>
                    <label>Email<input type='text' name='newUserPassword' /></label>
                    <label>Password<input type='text' name='newUserPassword' /></label>
                </form>
            </div>
        </div>
    )
}

export default UserInfoForm;