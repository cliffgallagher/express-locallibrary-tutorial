import React from "react";
import styles from '../List.module.css';

const GenreList = (props) => {
    return (
        <div>
            <ul className={styles.ulGrid}>{props.genreArray}</ul>
        </div>
    )
}

export default GenreList;