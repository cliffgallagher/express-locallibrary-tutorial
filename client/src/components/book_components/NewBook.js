import React, { useState } from 'react';
import NewBookForm from './NewBookForm';
import DuplicateBookWarning from './DuplicateBookWarning';

const NewBook = (props) => {
    const [isAddingNewBook, setIsAddingNewBook] = useState(false);
    const [addingDuplicate, setAddingDuplicate] = useState(false);
    
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

    return <div>
        {!isAddingNewBook && <div><button onClick={newBookButtonHandler}>Add New Book</button></div>}
        {isAddingNewBook && !addingDuplicate && <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} isAddingDuplicate={isAddingDuplicate}/>}
        {isAddingNewBook && addingDuplicate && (
            <div>
                <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook} />
                <DuplicateBookWarning />
            </div>
        )}
    </div>;
}

export default NewBook;