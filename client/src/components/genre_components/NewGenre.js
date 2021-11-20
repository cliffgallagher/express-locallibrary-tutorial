import React, { useState } from "react";
import NewGenreForm from "./NewGenreForm";
import DuplicateGenreForm from "./DuplicateGenreForm";

const NewGenre = (props) => {
    const [addNewGenre, setAddNewGenre] = useState(false);
    const [addingDuplicateGenre, setAddingDuplicateGenre] = useState(false);

    function addNewGenreButtonClickHandler() {
        setAddNewGenre(true);
    }
    
    return (
        <div>
            {!addNewGenre && !addingDuplicateGenre && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                </div>
            )}
            {addNewGenre && !addingDuplicateGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateGenre={setAddingDuplicateGenre}/>
                </div>
            )}
            {!addNewGenre && addingDuplicateGenre && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                    <DuplicateGenreForm setAddingDuplicateGenre={setAddingDuplicateGenre}/>
                </div>
            )}
        </div>
    )
}

export default NewGenre;