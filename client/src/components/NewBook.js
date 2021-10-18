import React, { useState } from 'react';
import BookForm from './BookForm';

const NewBook = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const liftUserInputFromNewBook = (userInput) => {
        console.log("userInput at NewBook level: " + JSON.stringify(userInput));
        props.liftUserInputToMyComponent(userInput);
    }
    
    function newBookButtonHandler(event) {
        setIsEditing(true);
    }

    function newBookCancelHandler() {
        console.log("clicked cancel button");
        setIsEditing(false);
    }
    
    return <div>
        {!isEditing && <div><button onClick={newBookButtonHandler}>Add New Book</button><button>Update Existing Record</button></div>}
        {isEditing && <BookForm onCancel={newBookCancelHandler} liftUserInputFromBookForm={liftUserInputFromNewBook}/>}
    </div>;
}

export default NewBook;