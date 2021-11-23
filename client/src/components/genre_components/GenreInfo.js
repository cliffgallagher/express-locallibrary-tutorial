import React from "react";
import styles from '../ElementInfo.module.css';

const GenreInfo = (props) => {
    return (
        <div>
            <p>{props.genreName}</p>
        </div>
    )
}

export default GenreInfo;