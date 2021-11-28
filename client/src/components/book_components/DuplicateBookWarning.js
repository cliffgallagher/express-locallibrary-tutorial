import React from 'react';
import styles from '../Popup.module.css';

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
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <form onSubmit={duplicateBookWarningSubmitHandler}>
                    <p>A book with title {props.newBookInfo.title} already exists in the database. Insert anyway?</p>
                    <div id={styles.button_div}>
                        <button className='close-button' onClick={duplicateBookWarningCloseHandler}>No</button>
                    </div>
                    <button type="submit">Yes</button>
                </form>
            </div>
        </div>
    )
}

export default DuplicateBookWarning;