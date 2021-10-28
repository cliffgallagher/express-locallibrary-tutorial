import React, { useEffect, useState } from 'react';
import './PopupForUpdate.css';

const PopupForDelete = (props) => {
    const [titleToDelete, setTitleToDelete] = useState("");
    const [isbnToDelete, setISBNToDelete] = useState("");
    const [summaryToDelete, setSummaryToDelete] = useState("");

    async function fetchDeleteBookInfo() {
        try {
            console.log("bookID in delete popup: " + props.bookID);
            const response = await fetch(`catalog/book/${props.bookID}/delete`);
            const bodyOfResponse = await response.json();
            setTitleToDelete(bodyOfResponse[0].title);
            setISBNToDelete(bodyOfResponse[0].isbn);
            setSummaryToDelete(bodyOfResponse[0].summary);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchDeleteBookInfo();
    }, []);

    function popupForDeleteCloseButtonHandler() {
        props.popupForDeleteHandler(false);
    }

    return <div className='popup'>
        <div className='popup-inner'>
            <h1>Are you sure you want to delete this book?</h1>
            <h3>Title: {titleToDelete}</h3>
            <h3>ISBN: {isbnToDelete}</h3>
            <h3>Summary: {summaryToDelete}</h3>
            <button onClick={popupForDeleteCloseButtonHandler}>Close</button>
        </div>
    </div>
}

export default PopupForDelete;