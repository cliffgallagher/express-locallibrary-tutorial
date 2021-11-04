import React from "react";
import GenreInfo from './GenreInfo';

const GenreListItem = (props) => {
    return (
        <div>
            <GenreInfo genreName={props.genreName}/>
        </div>
    )
}

export default GenreListItem;