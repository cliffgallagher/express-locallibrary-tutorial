import React, { useState } from 'react';
import BookForm from './BookForm';

const NewBook = () => {
    const [isEditing, setIsEditing] = useState(false);

    function newBookButtonHandler(event) {
        setIsEditing(true);
    }

    function newBookCancelHandler() {
        console.log("clicked cancel button");
        setIsEditing(false);
    }
    
    return <div>
        {!isEditing && <div><button onClick={newBookButtonHandler}>Add New Book</button><button>Update Existing Record</button></div>}
        {isEditing && <BookForm onCancel={newBookCancelHandler}/>}
    </div>;
}

export default NewBook;