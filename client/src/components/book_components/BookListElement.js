import React, { useState } from 'react';
import styles from '../ListElement.module.css';
import BookInfo from './BookInfo';

const BookListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);
    const [hideElement, setHideElement] = useState(false);

    //console.log("bookID in BookListElement: " + props.bookID);

    function showUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(true);
    }

    function hideUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(false);
    }

    function updateBookButtonClickHandler() {
        props.setDisplayBookPopupForUpdate(true);
        props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
    }

    function deleteBookButtonClickHandler() {
        props.setDisplayBookPopupForDelete(true);
        props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
    }

    function clickElementHandler() {
        setHideElement(true);
        //props.setDisplayElement(true);
    }

    return (
        <div className={`${styles.listElement} ${hideElement ? styles.hideElement : ''}`} onClick={clickElementHandler} /*onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}*/>
            {!displayUpdateAndDeleteButtons && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                </div>    
            )}
            {displayUpdateAndDeleteButtons && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                <button onClick={updateBookButtonClickHandler}>Update Book</button><button onClick={deleteBookButtonClickHandler}>Delete Book</button>
                </div>    
            )}
        </div>
    );
}

export default BookListElement;