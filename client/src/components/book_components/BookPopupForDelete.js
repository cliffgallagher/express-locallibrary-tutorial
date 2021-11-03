import React, { useEffect, useState } from 'react';
import './BookPopupForUpdate.css';

const BookPopupForDelete = (props) => {
    const [titleToDelete, setTitleToDelete] = useState("");
    const [isbnToDelete, setISBNToDelete] = useState("");
    const [authorToDelete, setAuthorToDelete] = useState("");

    async function fetchDeleteBookInfo() {
        try {
            //console.log("bookID in delete popup: " + props.bookID);
            const response = await fetch(`catalog/book/${props.bookID}/delete`);
            const bodyOfResponse = await response.json();
            //console.log("delete info in popup for delete: " + JSON.stringify(bodyOfResponse))
            setTitleToDelete(bodyOfResponse[0].title);
            setISBNToDelete(bodyOfResponse[0].isbn);
            setAuthorToDelete(`${bodyOfResponse[0].first_name} ${bodyOfResponse[0].family_name}`);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDeleteBookInfo();
    }, []);

    function popupForDeleteCloseButtonHandler() {
        props.setDisplayBookPopupForDelete(false);
    }

    async function deleteBookHandler(event) {
        event.preventDefault();
        //console.log("bookID in delete button handler: " + props.bookID);
        const bookIDAsObject = {
            bookIDattribute: props.bookID
        };
        const response = await fetch(`catalog/book/${props.bookID}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookIDAsObject)
        });
        props.setDisplayBookPopupForDelete(false);
        props.getBookList();
        //console.log("have received response from post in PopupForDelete");
        

        return response;
    }

    return <div className='popup'>
        <div className='popup-inner'>
            <form onSubmit={deleteBookHandler}>
                <h1>Are you sure you want to delete this book?</h1>
                <h3>Title: {titleToDelete}</h3>
                <h3>Author: {authorToDelete}</h3>
                <h3>ISBN: {isbnToDelete}</h3>
                <button type="submit">Delete</button><button onClick={popupForDeleteCloseButtonHandler}>Close</button>
            </form>
        </div>
    </div>
}

export default BookPopupForDelete;