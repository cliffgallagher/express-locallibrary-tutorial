import React, { useState } from 'react';
import NewAuthorForm from './NewAuthorForm';

const NewAuthor = () => {
    const [isAddingNewAuthor, setIsAddingNewAuthor] = useState(false);

    function newAuthorButtonClickHandler() {
        setIsAddingNewAuthor(true);
    }
    
    return (
        <div>
            {!isAddingNewAuthor && <button onClick={newAuthorButtonClickHandler}>Add New Author</button>}
            {isAddingNewAuthor && <NewAuthorForm />}
        </div>
    )
}

export default NewAuthor;