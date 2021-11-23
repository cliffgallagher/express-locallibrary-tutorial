import React from 'react';
import styles from '../ElementInfo.module.css';

const BookInfo = (props) => {
    return (
        <div>
            <p>{props.title}</p>
            <p>{props.author}</p>
            <p>{props.isbn}</p>
            <p>{props.genreName}</p>
            <p>{props.summary}</p>
        </div>
    )
}

export default BookInfo;