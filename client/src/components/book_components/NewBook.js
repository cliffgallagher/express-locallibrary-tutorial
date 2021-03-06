import React, { useState } from 'react';
import NewBookForm from './NewBookForm';
import DuplicateBookWarning from './DuplicateBookWarning';
import styles from '../NewElement.module.css';

const NewBook = (props) => {
    const [isAddingNewBook, setIsAddingNewBook] = useState(false);
    const [addingDuplicate, setAddingDuplicate] = useState(false);
    const [newBookInfo, setNewBookInfo] = useState();
    
    function newBookButtonHandler(event) {
        setIsAddingNewBook(true);
    }

    function newBookCancelHandler() {
        setIsAddingNewBook(false);
    }

    function isAddingDuplicate() {
        setAddingDuplicate(true);
    }

    function isNotAddingDuplicate() {
        setAddingDuplicate(false);
    }

    function newBookInfoToNewBook(newBookInfo) {

        const {title, escapedTitle, author_id, summary, isbn, genre_id} = newBookInfo;
        const objectForDuplicateWarning = {
            title: title,
            escapedTitle: escapedTitle,
            author_id: author_id,
            summary: summary,
            isbn: isbn,
            genre_id: genre_id
        }
        setNewBookInfo(objectForDuplicateWarning);
    }

    return <div>
        {!isAddingNewBook && <div id={styles.addElementButtonContainer}><button id={styles.addElementButton} onClick={newBookButtonHandler}>Add New Book</button></div>}
        {isAddingNewBook && (
            <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} isAddingDuplicate={isAddingDuplicate} newBookInfoToNewBook={newBookInfoToNewBook}/>
        )}
        {addingDuplicate && (
            <div>
                <DuplicateBookWarning newBookInfo={newBookInfo} isNotAddingDuplicate={isNotAddingDuplicate} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} setIsAddingNewBook={setIsAddingNewBook}/>
            </div>
        )}
    </div>;
}

export default NewBook;