import React, { useContext, useEffect, useState } from 'react';
import styles from '../ListElement.module.css';
import BookInfo from './BookInfo';
import ChosenBook from './ChosenBook';
import { AuthContext } from '../../context/auth-context';

const BookListElement = (props) => {
    //console.log(`book list element ${props.title} rendered.`);
    const auth = useContext(AuthContext);
    //console.log('rendereing BookListElement');
    

    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);
    const [hideElement, setHideElement] = useState(false);
    const [displayElement, setDisplayElement] = useState(false);

    //console.log('displayElement: ' + displayElement);
    //console.log('hideElement: ' + hideElement);
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
        setHideElement(true);
    }

    function deleteBookButtonClickHandler() {
        props.setDisplayBookPopupForDelete(true);
        props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
    }

    function clickElementHandler() {
        if (!displayElement) {
            setHideElement(true);
            setDisplayElement(true);
            //console.log("i clicked the element");
        }
    }

    function searchForSearchText() {
        if (auth.searchText) {
            if (auth.searchText.length > 0 ) {
                if (!(props.title.includes(auth.searchText)) && !(props.author.includes(auth.searchText)) && !(props.isbn.includes(auth.searchText)) && !(props.genreName.includes(auth.searchText)) && !(props.summary.includes(auth.searchText))) {
                    //console.log('no such text found');
                    setHideElement(true);
                } else {
                    setHideElement(false);
                }
            } else {
                setHideElement(false);
            }
        }
    }

    useEffect(() => {
        searchForSearchText();
    }, [auth.searchText]);




    return (
        <div className={`${styles.listElement} ${hideElement ? styles.hideElement : ''}`} onClick={clickElementHandler}>
            {!displayElement && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                </div>    
            )}
            {displayElement && (
                <div>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                    <ChosenBook title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary} setDisplayElement={setDisplayElement} setHideElement={setHideElement} getBookList={props.getBookList} updateBookButtonClickHandler={updateBookButtonClickHandler} bookID={props.bookID} authorID={props.authorID} genreID={props.genreID} getBookList={props.getBookList}/>
                </div>    
            )}
        </div>
    );
}

export default BookListElement;