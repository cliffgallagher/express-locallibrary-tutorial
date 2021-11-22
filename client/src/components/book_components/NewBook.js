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
        console.log("clicked cancel button");
        setIsAddingNewBook(false);
    }

    function isAddingDuplicate() {
        setAddingDuplicate(true);
    }

    function isNotAddingDuplicate() {
        setAddingDuplicate(false);
    }

    function newBookInfoToNewBook(newBookInfo) {

        const {title, author_id, summary, isbn, genre_id} = newBookInfo;
        //console.log("newBookInfo in NewBook: " + JSON.stringify(newBookInfo));
        const objectForDuplicateWarning = {
            title: title,
            author_id: author_id,
            summary: summary,
            isbn: isbn,
            genre_id: genre_id
        }
        setNewBookInfo(objectForDuplicateWarning);
        console.log("objectForDuplicateWarning info in NewBook: " + JSON.stringify(objectForDuplicateWarning));
        //props.newBookInfoNewBookToBookComponent(objectForDuplicateWarning);
        //console.log("objectForDuplicateWarning in NewBook: " + JSON.stringify(objectForDuplicateWarning));
    }

    return <div>
        {!isAddingNewBook && <div id={styles.addElementButtonContainer}><button id={styles.addElementButton} onClick={newBookButtonHandler}>Add New Book</button></div>}
        {isAddingNewBook && !addingDuplicate && (
            <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} isAddingDuplicate={isAddingDuplicate} newBookInfoToNewBook={newBookInfoToNewBook}/>
        )}
        {isAddingNewBook && addingDuplicate && (
            <div>
                <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} />
                <DuplicateBookWarning newBookInfo={newBookInfo} isNotAddingDuplicate={isNotAddingDuplicate} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook}/>
            </div>
        )}
    </div>;
}

export default NewBook;