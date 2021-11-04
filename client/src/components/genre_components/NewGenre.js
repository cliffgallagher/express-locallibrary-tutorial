import React, { useState } from "react";
import NewGenreForm from "./NewGenreForm";

const NewGenre = (props) => {
    const [addNewGenre, setAddNewGenre] = useState(false);

    function addNewGenreButtonClickHandler() {
        setAddNewGenre(true);
    }

    /*const setAddNewGenreToFalse = () => {
        setAddNewGenre(false);
    }

    function sendAddNewGenreToGenreComponent() {
        props.receiveAddNewGenre(setAddNewGenreToFalse);
    }*/
    
    return (
        <div>
            {!addNewGenre && (
                <div>
                    <button onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                </div>
            )}
            {addNewGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList}/>
                </div>
            )}
        </div>
    )
}

export default NewGenre;