import React, { useState } from "react";
import GenreInfo from './GenreInfo';
import styles from '../ListElement.module.css';
import ChosenGenre from './ChosenGenre.js';

const GenreListItem = (props) => {
    const [showUpdateAndDeleteButtons, setShowUpdateAndDeleteButtons] = useState(false);
    const [displayChosenElement, setDisplayChosenElement] = useState(false);
    const [hideChosenElement, setHideChosenElement] = useState(false);

    function mouseEnterGenreListItemHandler() {
        setShowUpdateAndDeleteButtons(true);
    }

    function mouseLeaveGenreListItemHandler() {
        setShowUpdateAndDeleteButtons(false);
    }

    function updateGenreButtonClickHandler() {
        props.setDisplayGenrePopupForUpdate(true);
        props.receiveGenreID(props.genreID);
    }

    function deleteGenreButtonHandler() {
        props.setDisplayGenrePopupForDelete(true);
        props.receiveGenreID(props.genreID);
    }

    function clickElementHandler() {
        setDisplayChosenElement(true);
        setHideChosenElement(true);
    }
    
    return (
        <div className={`${styles.listElement} ${hideChosenElement ? styles.hideElement: ''}`} onClick={clickElementHandler}>
            {!displayChosenElement && (
                <GenreInfo genreName={props.genreName}/>
            )}
            {displayChosenElement && (
                <div>
                    <GenreInfo genreName={props.genreName}/>
                    <ChosenGenre genreName={props.genreName} setDisplayChosenElement={setDisplayChosenElement} setHideChosenElement={setHideChosenElement} genreID={props.genreID} getGenreList={props.getGenreList}/>
                </div>

            )}
        </div>
    )
}

export default GenreListItem;