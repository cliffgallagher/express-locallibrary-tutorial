import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();

    function createNewUserClickHandler() {
        //console.log("create new user");
        props.setIsNewUser(true);
    }

    async function loginFormSubmitHandler(event) {
        event.preventDefault();
        const loginInfo = {
            loginUsername: loginUsername,
            loginPassword: loginPassword
        }
        const response = await fetch('users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        })
    }

    function loginUsernameChangeHandler(event) {
        setLoginUsername(event.target.value);
    }

    function loginPasswordChangeHandler(event) {
        setLoginPassword(event.target.value);
    }
    
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <p>Please log in below</p>
                <form className={styles.form} onSubmit={loginFormSubmitHandler}>
                    <label>Username<input type='text' name='newuserUsername' value={loginUsername} onChange={loginUsernameChangeHandler}/></label>
                    <label>Password<input type='text' name='newUserPassword' value={loginPassword} onChange={loginPasswordChangeHandler}/></label>
                    <div id={styles.button_div}>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <a onClick={createNewUserClickHandler}>Create New User</a>
            </div>
        </div>
    )
}

export default Login;