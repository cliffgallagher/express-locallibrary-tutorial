import React, { useState } from "react";
import NewGenreForm from "./NewGenreForm";
import DuplicateGenreForm from "./DuplicateGenreForm";
import styles from "../NewElement.module.css";

const NewGenre = (props) => {
    const [addNewGenre, setAddNewGenre] = useState(false);
    const [addingDuplicateGenre, setAddingDuplicateGenre] = useState(false);
    const [duplicateGenreName, setDuplicateGenreName] = useState();

    function addNewGenreButtonClickHandler() {
        setAddNewGenre(true);
    }

    const receiveGenreName = (name) => {
        setDuplicateGenreName(name);
    };
    
    return (
        <div>
            {!addNewGenre && !addingDuplicateGenre && (
                <div id={styles.addElementButtonContainer}>
                    <button id={styles.addElementButton} onClick={addNewGenreButtonClickHandler}>Add New Genre</button>
                </div>
            )}
            {addNewGenre && !addingDuplicateGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateGenre={setAddingDuplicateGenre} sendGenreNameUp={receiveGenreName}/>
                </div>
            )}
            {!addNewGenre && addingDuplicateGenre && (
                <div>
                    <NewGenreForm setAddNewGenre={setAddNewGenre} getGenreList={props.getGenreList} setAddingDuplicateGenre={setAddingDuplicateGenre} />
                    <DuplicateGenreForm setAddingDuplicateGenre={setAddingDuplicateGenre} duplicateGenreName={duplicateGenreName}/>
                </div>
            )}
        </div>
    )
}

export default NewGenre;