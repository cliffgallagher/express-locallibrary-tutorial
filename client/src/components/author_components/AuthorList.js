import React, { useState } from "react";
import styles from './AuthorList.module.css';

const AuthorList = (props) => {
    
    return (
        <div>
            <ul className={styles.ulGrid}>{props.authorArray}</ul>
        </div>
    )
}

export default AuthorList;