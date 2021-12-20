import React from 'react';
import styles from '../List.module.css';

const BookList = (props) => {

    return (
        <div>
            <ul className={styles.ulGrid}>{props.bookArray}</ul>
        </div>
    )
}

export default BookList;