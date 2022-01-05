import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const [validationErrors, setValidationErrors] = useState();
    const [areValidationErrors, setAreValidationErrors] = useState(false);

    function createNewUserClickHandler() {
        props.setIsNewUser(true);
    }

    async function loginFormSubmitHandler(event) {
        event.preventDefault();
        let loginInfo = {
            loginUsername: loginUsername,
            loginPassword: loginPassword
        }

        if (loginUsername) {
            loginInfo = {...loginInfo, escapedUsername: loginUsername.replaceAll('\'', '\\\'')}
        }

        const response = await fetch('users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        })
        const data = await response.json();
        if (typeof data === 'object') {
            if (data.hasOwnProperty('errors')) {
                setAreValidationErrors(true);
                let errorMessages = data.errors.map(element => element.msg);
                setValidationErrors(() => {
                    return errorMessages.map(element => <li>{element}</li>);
                });
            } else {
                props.sendLoggedInUserToApp(data);
                props.setIsLoggedIn(true);
            }
        }
    }

    function loginUsernameChangeHandler(event) {
        setLoginUsername(event.target.value);
    }

    function loginPasswordChangeHandler(event) {
        setLoginPassword(event.target.value);
    }
    
    return (
        <div className={styles.popup} data-cy='login_component'>
            <div className={styles.popup_inner}>
                {areValidationErrors && <ul>{validationErrors}</ul>}
                <p>Please log in below</p>
                <form className={styles.form} onSubmit={loginFormSubmitHandler}>
                    <label>Username<input type='text' name='newuserUsername' value={loginUsername} onChange={loginUsernameChangeHandler}/></label>
                    <label>Password<input type='password' name='newUserPassword' value={loginPassword} onChange={loginPasswordChangeHandler}/></label>
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