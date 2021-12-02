import React, { useState } from "react";
import NewGenreForm from "./NewGenreForm";
import DuplicateGenreForm from "./DuplicateGenreForm";
import styles from "../NewElement.module.css";

const NewGenre = (props) => {
    const [addNewGenre, setAddNewGenre] = useState(false);
    const [addingDuplicateGenre, setAddingDuplicateGenre] = useState(false);

    function addNewGenreButtonClickHandler() {
        setAddNewGenre(true);
    }
    
    return (
        <div>
            {!addNewGenre && !addingDuplicateGenre && (
                <div id={styles.addElementButtonContainer}>
                    <button id={styles.addElementButton} onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                </div>
            )}
            {addNewGenre && !addingDuplicateGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateGenre={setAddingDuplicateGenre}/>
                </div>
            )}
            {!addNewGenre && addingDuplicateGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateGenre={setAddingDuplicateGenre}/>
                    <DuplicateGenreForm setAddingDuplicateGenre={setAddingDuplicateGenre}/>
                </div>
            )}
        </div>
    )
}

export default NewGenre;