import React, { useState } from 'react';
import NewGenreForm from './NewGenreForm';

const NewGenre = () => {
    const [addingNewGenre, setAddingNewGenre] = useState(false);
    
    function addGenreClickHandler() {
        setAddingNewGenre(true);
    }

    function hideNewGenreForm() {
        setAddingNewGenre(false);
    }

    return (
        <div>
            {!addingNewGenre && <button onClick={addGenreClickHandler}>Add New Genre</button>}
            {addingNewGenre && <NewGenreForm hideNewGenreForm={hideNewGenreForm}/>}
        </div>
    )
}

export default NewGenre;