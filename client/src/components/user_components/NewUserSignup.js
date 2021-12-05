import React from 'react';
import { AiFillPropertySafety } from 'react-icons/ai';
import styles from './NewUserSignup.module.css';

const NewUserSignup = (props) => {
    
    function backToLoginClickHandler() {
        props.setIsNewUser(false);
    }
    
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <p>Please enter your information below:</p>
                <form className={styles.form}>
                    <label>First Name<input type='text' name='newuserUsername' /></label>
                    <label>Last Name<input type='text' name='newUserPassword' /></label>
                    <label>Email<input type='text' name='newUserPassword' /></label>
                    <label>Password<input type='text' name='newUserPassword' /></label>
                    <label>Confirm Password<input type='text' name='newUserPassword' /></label>
                    <div id={styles.button_div}>
                        <button>Create User</button>
                    </div>
                </form>
                <a onClick={backToLoginClickHandler}>Back to Login</a>
            </div>
        </div>
    )
}

export default NewUserSignup;