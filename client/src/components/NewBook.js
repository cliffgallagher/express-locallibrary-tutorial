import React, { useState } from 'react';
import NewBookForm from './NewBookForm';
import BookUpdateForm from './BookUpdateForm';

const NewBook = (props) => {
    const [isAddingNewBook, setIsAddingNewBook] = useState(false);
    const [isUpdatingExistingBook, setIsUpdatingExistinBook] = useState(false);
    
    function newBookButtonHandler(event) {
        setIsAddingNewBook(true);
    }

    function newBookCancelHandler() {
        console.log("clicked cancel button");
        setIsAddingNewBook(false);
    }

    function updateBookButtonHandler() {
        console.log("you clicked update button");
        setIsUpdatingExistinBook(true);
    }

    function updateBookCancelHandler() {
        setIsUpdatingExistinBook(false);
    }


    return <div>
        {!isAddingNewBook && !isUpdatingExistingBook && <div><button onClick={newBookButtonHandler}>Add New Book</button><button onClick={updateBookButtonHandler}>Update Existing Record</button></div>}
        {isAddingNewBook && <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentToNewBook}/>}
        {isUpdatingExistingBook && <div><BookUpdateForm onCancel={updateBookCancelHandler}/></div>}
    </div>;
}

export default NewBook;