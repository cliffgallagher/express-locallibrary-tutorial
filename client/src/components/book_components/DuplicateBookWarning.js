import React from 'react';
import '../Popup.css';

const DuplicateBookWarning = (props) => {
    //console.log("newBookInfo in DuplicateBookWarning: " + JSON.stringify(props.newBookInfo));
    async function duplicateBookWarningSubmitHandler(event) {
        event.preventDefault();
        //console.log("submit handler: " + props.newBookInfo);
        await fetch('catalog/book/create/two', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.newBookInfo)
        });
        props.isNotAddingDuplicate();
        props.getBookListNewBookToBookForm();
    }

    function duplicateBookWarningCloseHandler() {
        props.isNotAddingDuplicate();
    }


    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form onSubmit={duplicateBookWarningSubmitHandler}>
                    <p>A book with title {props.newBookInfo.title} already exists in the database. Insert anyway?</p>
                    <button type="submit">Yes</button>
                    <button className='close-button' onClick={duplicateBookWarningCloseHandler}>No</button>
                </form>
            </div>
        </div>
    )
}

export default DuplicateBookWarning;