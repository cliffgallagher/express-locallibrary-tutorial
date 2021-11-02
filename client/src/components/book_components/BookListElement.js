import React from 'react';
import './BookListElement.css'

const BookListElement = (props) => {
    return (
        <div className='bookListElement'>
            <p>{props.title}</p>
            <p>{props.author}</p>
            <p>{props.isbn}</p>
            <p>{props.genreName}</p>
            <p>{props.summary}</p>
        </div>
    );
}

export default BookListElement;