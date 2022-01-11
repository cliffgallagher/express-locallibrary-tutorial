import React, { useState } from "react";
import styles from '../List.module.css';

const AuthorList = (props) => {
    
    return (
        <div>
            <ul className={styles.ulGrid} data-cy='author_list'>{props.authorArray}</ul>
        </div>
    )
}

export default AuthorList;