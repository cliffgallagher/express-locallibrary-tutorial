import React, { useState } from "react";
import GenreInfo from './GenreInfo';
import styles from '../ListElement.module.css';

const GenreListItem = (props) => {
    const [showUpdateAndDeleteButtons, setShowUpdateAndDeleteButtons] = useState(false);

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
    
    return (
        <div className={styles.listElement} onMouseEnter={mouseEnterGenreListItemHandler} onMouseLeave={mouseLeaveGenreListItemHandler}>
            {!showUpdateAndDeleteButtons && <GenreInfo genreName={props.genreName}/>}
            {showUpdateAndDeleteButtons && (
                <div>
                    <GenreInfo genreName={props.genreName}/>
                    <button onClick={updateGenreButtonClickHandler}>Update Genre</button><button onClick={deleteGenreButtonHandler}>Delete Genre</button>
                </div>
            )}
        </div>
    )
}

export default GenreListItem;