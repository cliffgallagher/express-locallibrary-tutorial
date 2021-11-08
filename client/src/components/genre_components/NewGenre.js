import React, { useState } from "react";
import NewGenreForm from "./NewGenreForm";
import DuplicateGenreForm from "./DuplicateGenreForm";

const NewGenre = (props) => {
    const [addNewGenre, setAddNewGenre] = useState(false);
    const [addingDuplicateAuthor, setAddingDuplicateAuthor] = useState(false);

    function addNewGenreButtonClickHandler() {
        setAddNewGenre(true);
    }
    
    return (
        <div>
            {!addNewGenre && !addingDuplicateAuthor && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                </div>
            )}
            {addNewGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateAuthor={setAddingDuplicateAuthor}/>
                </div>
            )}
            {addingDuplicateAuthor && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                    <p>adding duplicate Author</p>
                </div>
            )}
        </div>
    )
}

export default NewGenre;