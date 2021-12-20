import React, { useContext, useEffect, useState } from 'react';
import styles from '../ListElement.module.css';
import BookInfo from './BookInfo';
import ChosenBook from './ChosenBook';
import { AuthContext } from '../../context/auth-context';

const BookListElement = (props) => {
    const auth = useContext(AuthContext);
    
    const [hideElement, setHideElement] = useState(false);
    const [displayElement, setDisplayElement] = useState(false);
    const [gridOrder, setGridOrder] = useState(false);

    function updateBookButtonClickHandler() {
        props.setDisplayBookPopupForUpdate(true);
        props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
        setHideElement(true);
    }

    function clickElementHandler() {
        if (!displayElement) {
            setHideElement(true);
            setDisplayElement(true);
        }
    }

    function searchForSearchText() {
        if (auth.searchText) {
            if (auth.searchText.length > 0 ) {
                const searchTextToLowerCase = auth.searchText.toLowerCase();
                if (!(props.title.toLowerCase().includes(searchTextToLowerCase)) && !(props.author.toLowerCase().includes(searchTextToLowerCase)) && !(props.isbn.toLowerCase().includes(searchTextToLowerCase)) && !(props.genreName.toLowerCase().includes(searchTextToLowerCase)) && !(props.summary.toLowerCase().includes(searchTextToLowerCase))) {
                    setHideElement(true);
                    setGridOrder(true);
                } else {
                    setHideElement(false);
                    setGridOrder(false);
                }
            } else {
                setHideElement(false);
                setGridOrder(false);
            }
        } else {
            setHideElement(false);
            setGridOrder(false);
        }
    }

    useEffect(() => {
        searchForSearchText();
    }, [auth.searchText]);

    return (
        <div className={`${styles.listElement} ${hideElement ? styles.hideElement : ''} ${gridOrder ? styles.gridOrder : ''}`} onClick={clickElementHandler}>
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