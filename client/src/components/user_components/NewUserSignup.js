import React, { useState } from 'react';
import styles from './NewUserSignup.module.css';

const NewUserSignup = (props) => {
    const [newUserFirstName, setNewUserFirstName] = useState();
    const [newUserLastName, setNewUserLastName] = useState();
    const [newUserEmail, setNewUserEmail] = useState();
    const [newUserPassword, setNewUserPassword] = useState();
    const [newUserConfirmedPassword, setNewUserConfirmedPassword] = useState();
    
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

    async function newUserSignupSubmitHandler(event) {
        event.preventDefault();
        const newUserInfo = {
            newUserFirstName: newUserFirstName,
            newUserLastName: newUserLastName,
            newUserEmail: newUserEmail,
            newUserPassword: newUserPassword,
            newUserConfirmedPassword: newUserConfirmedPassword
        }

        const response = await fetch('users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        })

        
        //console.log(newUserInfo);
        setNewUserFirstName('');
        setNewUserLastName('');
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserConfirmedPassword('');
    }
    
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <p>Please enter your information below:</p>
                <form className={styles.form} onSubmit={newUserSignupSubmitHandler}>
                    <label>First Name<input type='text' name='newuserFirstName' onChange={newUserFirstNameChangeHandler} value={newUserFirstName}/></label>
                    <label>Last Name<input type='text' name='newUserLastName' onChange={newUserLastNameChangeHandler} value={newUserLastName}/></label>
                    <label>Email<input type='text' name='newUserEmail' onChange={newUserEmailChangeHandler} value={newUserEmail}/></label>
                    <label>Password<input type='text' name='newUserPassword' onChange={newUserPasswordChangeHandler} value={newUserPassword}/></label>
                    <label>Confirm Password<input type='text' name='newUserConfirmedPassword' onChange={newUserConfirmedPasswordChangeHandler} value={newUserConfirmedPassword}/></label>
                    <div id={styles.button_div}>
                        <button type='submit'>Create User</button>
                    </div>
                </form>
                <a onClick={backToLoginClickHandler}>Back to Login</a>
            </div>
        </div>
    )
}

export default NewUserSignup;