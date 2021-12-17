import React, { useContext } from 'react';
import styles from '../Popup.module.css';
import {AuthContext} from '../../context/auth-context';

const DuplicateBookWarning = (props) => {
    const auth = useContext(AuthContext);

    async function duplicateBookWarningSubmitHandler(event) {
        event.preventDefault();
        const response = await fetch('catalog/book/create/two', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(props.newBookInfo)
        });
        const data = response.json();
        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
        }
        props.isNotAddingDuplicate();
        props.getBookListNewBookToBookForm();
        props.setIsAddingNewBook(false);
    }

    function duplicateBookWarningCloseHandler() {
        props.isNotAddingDuplicate();
        props.setIsAddingNewBook(false);
    }


    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <form onSubmit={duplicateBookWarningSubmitHandler}>
                    <p>A book with title '{props.newBookInfo.title}' already exists in the database. Insert anyway?</p>
                    <div id={styles.button_div}>
                        <button type="submit">Yes</button>
                        <button id={styles.right_most_button} onClick={duplicateBookWarningCloseHandler}>No</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DuplicateBookWarning;