import React, { useState } from 'react';
import NewBookForm from './NewBookForm';

const NewBook = (props) => {
    const [isAddingNewBook, setIsAddingNewBook] = useState(false);
    
    function newBookButtonHandler(event) {
        setIsAddingNewBook(true);
    }

    function newBookCancelHandler() {
        console.log("clicked cancel button");
        setIsAddingNewBook(false);
    }

    return <div>
        {!isAddingNewBook && <div><button onClick={newBookButtonHandler}>Add New Book</button></div>}
        {isAddingNewBook && <NewBookForm onCancel={newBookCancelHandler} getBookListNewBookToBookForm={props.getBookListMyComponentNewToNewBook}/>}
    </div>;
}

export default NewBook;