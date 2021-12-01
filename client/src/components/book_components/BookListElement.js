import React, { useState } from 'react';
import styles from '../ListElement.module.css';
import BookInfo from './BookInfo';
import ChosenBook from './ChosenBook';

const BookListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);
    const [hideElement, setHideElement] = useState(false);
    const [displayElement, setDisplayElement] = useState(false);

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
        setDisplayElement(true);
    }

    return (
        <div className={`${styles.listElement} ${hideElement ? styles.hideElement : ''}`} onClick={clickElementHandler} /*onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}*/>
            {!displayElement && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                </div>    
            )}
            {displayElement && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                    <ChosenBook title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary} setDisplayElement={setDisplayElement} setHideElement={setHideElement} getBookList={props.getBookList}/>
                </div>    
            )}
        </div>
    );
}

export default BookListElement;