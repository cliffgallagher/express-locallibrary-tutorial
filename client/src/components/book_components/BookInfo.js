import React from 'react';
import styles from '../ElementInfo.module.css';

const BookInfo = (props) => {
    return (
        <div>
            <p>Title: {props.title}</p>
            <p>Author: {props.author}</p>
            <p>ISBN: {props.isbn}</p>
            <p>Genre: {props.genreName}</p>
            <p>Summary: {props.summary}</p>
        </div>
    )
}

export default BookInfo;