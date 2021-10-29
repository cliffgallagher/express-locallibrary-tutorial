import React from 'react';

const BookInfo = (props) => {
    return <div><p>{props.title}</p><p>{props.author}</p><p>{props.isbn}</p><p>{props.genre}</p><p>{props.summary}</p></div>
}

export default BookInfo;