import React, { useState, useEffect, useContext } from 'react';
import styles from '../Popup.module.css';
import { AuthContext } from '../../context/auth-context';

const AuthorPopupForDelete = (props) => {
    const [authorNameOnDeleteForm, setAuthorNameOnDeleteForm] = useState();
    const [authorBirthDateOnDeleteForm, setAuthorBirthDateOnDeleteForm] = useState();
    const [authorDeathDateOnDeleteForm, setAuthorDeathDateOnDeleteForm] = useState();
    const [receivedForeignKeyConstraintError, setReceivedForeignKeyConstraintError] = useState(false);
    const [validationErrors, setValidationErrors] = useState();
    const auth = useContext(AuthContext);
    
    async function getInitialValues() {
        try {
            const response = await fetch(`catalog/author/${props.authorID}/delete`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const data = await response.json();
            if (typeof data === 'object') {
                if (data.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            setAuthorNameOnDeleteForm(`${data[0].first_name} ${data[0].family_name}`);
            setAuthorBirthDateOnDeleteForm(`${data[0].date_of_birth.slice(5, 7)}-${data[0].date_of_birth.slice(8, 10)}-${data[0].date_of_birth.slice(0, 4)}`);
            data[0].date_of_death && setAuthorDeathDateOnDeleteForm(`${data[0].date_of_death.slice(5, 7)}-${data[0].date_of_death.slice(8, 10)}-${data[0].date_of_death.slice(0, 4)}`);
        } catch(e) {
            //console.log(e);
        }
        
    }

    async function deleteAuthorFormSubmitHandler(event) {
        event.preventDefault();
        try {
            const response = await fetch(`catalog/author/${props.authorID}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const data = await response.json();

            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
            if (data.hasOwnProperty('errors')) {
                const errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.includes("SequelizeForeignKeyConstraintError")) {
                    setReceivedForeignKeyConstraintError(true);
                } else {
                    setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                    });
                }
            } else {
                props.setDisplayElementPopupForDelete(false);
                props.setDisplayChosenElement(false);
                props.getAuthorList();
            }

        } catch(e) {
            //console.log("error in popupForDelete: " + e);
        }
        
    }

    useEffect(() => {
        getInitialValues();
    }, []);
    
    function popupForDeleteCloseButtonHandler() {
        props.setDisplayElementPopupForDelete(false)
    }

    function foreignKeyWarningCloseButtonHandler(event) {
        event.preventDefault();
        props.setDisplayElementPopupForDelete(false);
        setReceivedForeignKeyConstraintError(false);
    }
    
    return <div className={styles.popup}>
    <div className={styles.popup_inner} id={styles.popup_for_delete} data-cy='author_popup_for_delete'>
        {!receivedForeignKeyConstraintError && <form onSubmit={deleteAuthorFormSubmitHandler} >
            <h2>Are you sure you want to delete this author?</h2>
            <h3>Name: {authorNameOnDeleteForm}</h3>
            <h3>Date of Birth: {authorBirthDateOnDeleteForm}</h3>
            <h3>Died: {authorDeathDateOnDeleteForm}</h3>
            <div id={styles.button_div}>
                <button type="submit">Delete Author</button>
                <button className='close-button' id={styles.right_most_button} onClick={popupForDeleteCloseButtonHandler}>Close</button>
            </div>
        </form>}
        {receivedForeignKeyConstraintError && (
            <form>
                <h3>You're attempting to delete an author who wrote a book currently stored in the database.</h3>
                <h3>Please delete the book or update it with a different author before deleting this author.</h3>
                <div id={styles.button_div}>
                    <button onClick={foreignKeyWarningCloseButtonHandler}>Close</button>
                </div>
            </form>
        )}
    </div>
</div>
}

export default AuthorPopupForDelete;