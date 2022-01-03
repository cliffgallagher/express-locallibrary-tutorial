import React, { useState } from 'react';
import styles from './NewUserSignup.module.css';

const NewUserSignup = (props) => {
    const [newUserFirstName, setNewUserFirstName] = useState();
    const [newUserLastName, setNewUserLastName] = useState();
    const [newUserEmail, setNewUserEmail] = useState();
    const [newUserUsername, setNewUserUsername] = useState();
    const [newUserPassword, setNewUserPassword] = useState();
    const [newUserConfirmedPassword, setNewUserConfirmedPassword] = useState();
    const [validationErrors, setValidationErrors] = useState();
    const [successfulSignup, setSuccessfulSignup] = useState(false);
    const [passwordState, setPasswordState] = useState('password');
    const [areValidationErrors, setAreValidationErrors] = useState(false);
    
    function backToLoginClickHandler() {
        props.setIsNewUser(false);
    }

    function newUserFirstNameChangeHandler(event) {
        setNewUserFirstName(event.target.value);
    }

    function newUserLastNameChangeHandler(event) {
        setNewUserLastName(event.target.value);
    }

    function newUserEmailChangeHandler(event) {
        setNewUserEmail(event.target.value);
    }

    function newUserPasswordChangeHandler(event) {
        setNewUserPassword(event.target.value);
    }

    function newUserConfirmedPasswordChangeHandler(event) {
        setNewUserConfirmedPassword(event.target.value);
    }

    function newUserUsernameChangeHandler(event) {
        setNewUserUsername(event.target.value);
    }

    async function newUserSignupSubmitHandler(event) {
        event.preventDefault();
        let newUserInfo = {
            newUserFirstName: newUserFirstName,
            newUserLastName: newUserLastName,
            newUserEmail: newUserEmail,
            newUserUsername: newUserUsername,
            newUserPassword: newUserPassword,
            newUserConfirmedPassword: newUserConfirmedPassword
        }

        if (newUserFirstName) {
            newUserInfo = {...newUserInfo, replacedNewUserFirstName: newUserFirstName.replaceAll('\'', '\\\'')}
        }

        if (newUserLastName) {
            newUserInfo = {...newUserInfo, replacedNewUserLastName: newUserLastName.replaceAll('\'', '\\\'')}
        }

        if (newUserEmail) {
            newUserInfo = {...newUserInfo, replacedNewUserEmail: newUserEmail.replaceAll('\'', '\\\'')}
        }

        if (newUserUsername) {
            newUserInfo = {...newUserInfo, replacedNewUserUsername: newUserUsername.replaceAll('\'', '\\\'')}
        }

        const response = await fetch('users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        })

        const data = await response.json();
        if (typeof data === 'object') {
            if (data.hasOwnProperty('errors')) {
                setAreValidationErrors(true);
                let errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.indexOf('SequelizeUniqueConstraintError') >= 0) {
                    errorMessages.pop();
                    if (data.errors[0].type === 'username') {
                        errorMessages.push('That username already exists in the database. Please pick a different username.')
                    }
                    if (data.errors[0].type === 'email') {
                        errorMessages.push('That email already exists in the database. Please pick a different email.')
                    }
                }
                setValidationErrors(() => {
                    return errorMessages.map(element => <li>{element}</li>);
                });
            } else {
                setSuccessfulSignup(true);
                setTimeout(() => {
                    props.setIsNewUser(false);
                }, 3000);
            }
        }
    }

    function passwordCheckboxChangeHandler() {
        if (passwordState === 'password') {
            setPasswordState('text')
        } else {
            setPasswordState('password');
        }
    }
    
    return (
        <div className={styles.popup}>
            {!successfulSignup &&
            <div className={styles.popup_inner}>
                {areValidationErrors && <ul>{validationErrors}</ul>}
                <p>Please enter your information below:</p>
                <form className={styles.form} onSubmit={newUserSignupSubmitHandler}>
                    <label>First Name<input type='text' name='newuserFirstName' onChange={newUserFirstNameChangeHandler} value={newUserFirstName}/></label>
                    <label>Last Name<input type='text' name='newUserLastName' onChange={newUserLastNameChangeHandler} value={newUserLastName}/></label>
                    <label>Email<input type='text' name='newUserEmail' onChange={newUserEmailChangeHandler} value={newUserEmail}/></label>
                    <label>Username<input type='text' name='newuserUsername' onChange={newUserUsernameChangeHandler} value={newUserUsername}/></label>
                    <label>Password<input type={passwordState} name='newUserPassword' onChange={newUserPasswordChangeHandler} value={newUserPassword}/></label>
                    <label>Confirm Password<input type={passwordState} name='newUserConfirmedPassword' onChange={newUserConfirmedPasswordChangeHandler} value={newUserConfirmedPassword}/></label>
                    <div id={styles.show_password_checkbox}>
                        <input type="checkbox" id="showPasswordID" name="showPasswordName" onChange={passwordCheckboxChangeHandler}/>
                        <label for="showPasswordID">Show Password</label>
                    </div>
                    <div id={styles.button_div}>
                        <button type='submit'>Create User</button>
                    </div>
                </form>
                <a onClick={backToLoginClickHandler}>Back to Login</a>
            </div>}
            {successfulSignup && 
               <div className={styles.popup_inner}>
                   <p data-cy="new_user_created">New user created. Redirecting to login page...</p>
               </div>  
            }
        </div>
    )
}

export default NewUserSignup;