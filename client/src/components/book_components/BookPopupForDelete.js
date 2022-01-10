import React, { useEffect, useState, useContext } from 'react';
import styles from '../Popup.module.css';
import {AuthContext} from '../../context/auth-context';

const BookPopupForDelete = (props) => {
    const [titleToDelete, setTitleToDelete] = useState("");
    const [isbnToDelete, setISBNToDelete] = useState("");
    const [authorToDelete, setAuthorToDelete] = useState("");
    const auth = useContext(AuthContext);

    async function fetchDeleteBookInfo() {
        try {
            const response = await fetch(`catalog/book/${props.bookID}/delete`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const bodyOfResponse = await response.json();
            if (typeof bodyOfResponse === 'object') {
                if (bodyOfResponse.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            setTitleToDelete(bodyOfResponse[0].title);
            setISBNToDelete(bodyOfResponse[0].isbn);
            setAuthorToDelete(`${bodyOfResponse[0].first_name} ${bodyOfResponse[0].family_name}`);
        } catch(e) {
            //console.log(e);
        }
    }

    useEffect(() => {
        fetchDeleteBookInfo();
    }, []);

    function popupForDeleteCloseButtonHandler() {
        props.setDisplayElementPopupForDelete(false);
    }

    async function deleteBookHandler(event) {
        event.preventDefault();
        const bookIDAsObject = {
            bookIDattribute: props.bookID
        };
        const response = await fetch(`catalog/book/${props.bookID}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(bookIDAsObject)
        });
        props.setDisplayElementPopupForDelete(false);
        props.setDisplayElement(false);
        props.getBookList();        

        return response;
    }

    return <div className={styles.popup}>
        <div className={styles.popup_inner}>
            <form onSubmit={deleteBookHandler} id={styles.popup_for_delete} data-cy='book_popup_for_delete'>
                <h1>Are you sure you want to delete this book?</h1>
                <h3>Title: {titleToDelete}</h3>
                <h3>Author: {authorToDelete}</h3>
                <h3>ISBN: {isbnToDelete}</h3>
                <div id={styles.button_div}>
                    <button type="submit">Delete</button><button id={styles.right_most_button} onClick={popupForDeleteCloseButtonHandler}>Close</button>
                </div>   
            </form>
        </div>
    </div>
}

export default BookPopupForDelete;