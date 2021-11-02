import React, { useState } from 'react';
import NewAuthorForm from './NewAuthorForm';

const NewAuthor = () => {
    const [addingNewAuthor, setAddingNewAuthor] = useState(false);

    function addNewAuthorButtonClickHandler() {
        setAddingNewAuthor(true);
    }

    function hideNewAuthorForm() {
        setAddingNewAuthor(false);
    }

    return (
        <div>
            {!addingNewAuthor && <button onClick={addNewAuthorButtonClickHandler}>Add New Author</button>}
            {addingNewAuthor && <NewAuthorForm hideNewAuthorForm={hideNewAuthorForm}/>}
        </div>
    )
}

export default NewAuthor;