import React, { useState } from "react";
import GenreInfo from './GenreInfo';
import '../ListElement.css';

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
    
    return (
        <div className='listElement' onMouseEnter={mouseEnterGenreListItemHandler} onMouseLeave={mouseLeaveGenreListItemHandler}>
            {!showUpdateAndDeleteButtons && <GenreInfo genreName={props.genreName}/>}
            {showUpdateAndDeleteButtons && (
                <div>
                    <GenreInfo genreName={props.genreName}/>
                    <button onClick={updateGenreButtonClickHandler}>Update Genre</button><button>Delete Genre</button>
                </div>
            )}
        </div>
    )
}

export default GenreListItem;