import React from 'react';

const BookInfo = (props) => {
    return <div><p>{props.title}</p><p>{props.isbn}</p><p>{props.summary}</p></div>
}

export default BookInfo;