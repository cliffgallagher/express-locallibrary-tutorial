import React from "react";
import GenreInfo from './GenreInfo';
import '../ListElement.css';

const GenreListItem = (props) => {
    return (
        <div className='listElement'>
            <GenreInfo genreName={props.genreName}/>
        </div>
    )
}

export default GenreListItem;