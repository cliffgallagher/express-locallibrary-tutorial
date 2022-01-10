import React from 'react';
import styles from '../ElementInfo.module.css';

const BookInfo = (props) => {
    return (
        <div data-cy='book_info'>
            <p data-cy='book_info_title'>Title: {props.title}</p>
            <p data-cy='book_info_author'>Author: {props.author}</p>
            <p data-cy='book_info_isbn'>ISBN: {props.isbn}</p>
            <p data-cy='book_info_genre'>Genre: {props.genreName}</p>
            <p data-cy='book_info_summary'>Summary: {props.summary}</p>
        </div>
    )
}

export default BookInfo;