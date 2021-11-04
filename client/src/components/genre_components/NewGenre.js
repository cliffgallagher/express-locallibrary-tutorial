import React, { useState } from "react";
import NewGenreForm from "./NewGenreForm";

const NewGenre = () => {
    const [addNewGenre, setAddNewGenre] = useState(false);

    function addNewGenreButtonClickHandler() {
        setAddNewGenre(true);
    }
    
    return (
        <div>
            {!addNewGenre && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                </div>
            )}
            {addNewGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre}/>
                </div>
            )}
        </div>
    )
}

export default NewGenre;