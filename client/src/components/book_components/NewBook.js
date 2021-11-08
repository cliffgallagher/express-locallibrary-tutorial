import React, { useState } from 'react';
import NewBookForm from './NewBookForm';
import DuplicateBookWarning from './DuplicateBookWarning';

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

    function newBookInfoToNewBook(newBookInfo) {
        const {title, authorID, summary, isbn, genreID} = newBookInfo;
        const objectForDuplicateWarning = {
            title: title,
            authorID: authorID,
            summary: summary,
            isbn: isbn,
            genreID: genreID
        }
        props.newBookInfoNewBookToBookComponent(objectForDuplicateWarning);
        console.log("objectForDuplicateWarning in NewBook: " + JSON.stringify(objectForDuplicateWarning));
    }

    return <div>
        {!isAddingNewBook && <div><button onClick={newBookButtonHandler}>Add New Book</button></div>}
        {isAddingNewBook && !addingDuplicate && <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} isAddingDuplicate={isAddingDuplicate} newBookInfoToNewBook={newBookInfoToNewBook}/>}
        {isAddingNewBook && addingDuplicate && (
            <div>
                <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} />
                <DuplicateBookWarning newBookInfo={newBookInfo}/>
            </div>
        )}
    </div>;
}

export default NewBook;