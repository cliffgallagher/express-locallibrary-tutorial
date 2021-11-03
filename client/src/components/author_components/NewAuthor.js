import React, { useState } from 'react';
import NewAuthorForm from './NewAuthorForm';

const NewAuthor = (props) => {
    const [isAddingNewAuthor, setIsAddingNewAuthor] = useState(false);

    function newAuthorButtonClickHandler() {
        setIsAddingNewAuthor(true);
    }

    function hideNewAuthorForm() {
        setIsAddingNewAuthor(false);
    }
    
    return (
        <div>
            {!isAddingNewAuthor && <button onClick={newAuthorButtonClickHandler}>Add New Author</button>}
            {isAddingNewAuthor && <NewAuthorForm hideNewAuthorForm={hideNewAuthorForm} getAuthorList={props.getAuthorList}/>}
        </div>
    )
}

export default NewAuthor;