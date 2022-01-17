import React, { useState } from "react";
import styles from '../ChosenElement.module.css';
import BookInfo from "./BookInfo";
import BookPopupForDelete from "./BookPopupForDelete";
import BookPopupForUpdate from "./BookPopupForUpdate";

const ChosenBook = (props) => {
    const [displayElementPopupForUpdate, setDisplayElementPopupForUpdate] = useState(false);
    const [displayElementPopupForDelete, setDisplayElementPopupForDelete] = useState(false);

    function updateBookButtonClickHandler() {
        setDisplayElementPopupForUpdate(true);
    }

    async function chosenElementCancelHandler() {
        setTimeout(() => {
            props.setDisplayElement(false);
            props.setHideElement(false);
        }, 50);
    }

    function deleteBookButtonClickHandler() {
        setDisplayElementPopupForDelete(true);
    }
    
    return (
        <div>
            {!displayElementPopupForUpdate && !displayElementPopupForDelete && (
                <div className={styles.chosen_element_popup}>
                <div className={styles.chosen_element_popup_inner} data-cy='chosen_book'>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                    <div id={styles.button_div}>
                        <button onClick={updateBookButtonClickHandler}>Update</button>
                        <button onClick={deleteBookButtonClickHandler}>Delete</button>
                        <button onClick={chosenElementCancelHandler} onTouchStart={chosenElementCancelHandler}>Cancel</button>
                    </div>
                </div>
            </div>
            )}
            {displayElementPopupForUpdate && (
                <div>
                    <BookPopupForUpdate bookID={props.bookID} authorID={props.authorID} genreID={props.genreID} setDisplayElementPopupForUpdate={setDisplayElementPopupForUpdate} getBookList={props.getBookList} setDisplayElement={props.setDisplayElement} setHideElement={props.setHideElement}/>
                </div>
            )}
            {displayElementPopupForDelete && (
                <div>
                    <BookPopupForDelete bookID={props.bookID} authorID={props.authorID} genreID={props.genreID} setDisplayElementPopupForDelete={setDisplayElementPopupForDelete} getBookList={props.getBookList} setDisplayElement={props.setDisplayElement} setHideElement={props.setHideElement}/>
                </div>
            )}
        </div>
    )

}

export default ChosenBook;