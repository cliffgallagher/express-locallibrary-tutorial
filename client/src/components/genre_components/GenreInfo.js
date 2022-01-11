import React from "react";
import styles from '../ElementInfo.module.css';

const GenreInfo = (props) => {
    return (
        <div>
            <p data-cy='genre_info_name_field'>{props.genreName}</p>
        </div>
    )
}

export default GenreInfo;