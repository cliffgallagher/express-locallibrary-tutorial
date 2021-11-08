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
            {addNewGenre && !addingDuplicateAuthor && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateAuthor={setAddingDuplicateAuthor}/>
                </div>
            )}
            {!addNewGenre && addingDuplicateAuthor && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                    <DuplicateGenreForm setAddingDuplicateAuthor={setAddingDuplicateAuthor}/>
                </div>
            )}
        </div>
    )
}

export default NewGenre;