import React from 'react';
import './BookListElement.css'
import BookInfo from './BookInfo';

const BookListElement = (props) => {

    return (
        <div className='bookListElement'>
            <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
        </div>
    );
}

export default BookListElement;