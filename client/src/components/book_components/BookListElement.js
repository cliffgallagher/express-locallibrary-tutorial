import React, { useState } from 'react';
import './BookListElement.css'
import BookInfo from './BookInfo';

const BookListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);

    function showUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(true);
    }

    function hideUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(false);
    }

    return (
        <div className='bookListElement' onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}>
            {!displayUpdateAndDeleteButtons && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                </div>    
            )}
            {displayUpdateAndDeleteButtons && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                <button>Update Book</button><button>Delete Book</button>
                </div>    
            )}
        </div>
    );
}

export default BookListElement;