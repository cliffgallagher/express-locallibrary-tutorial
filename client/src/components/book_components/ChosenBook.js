import React, { useState } from "react";
import styles from '../ChosenElement.module.css';
import BookInfo from "./BookInfo";
import BookPopupForUpdate from "./BookPopupForUpdate";

const ChosenBook = (props) => {
    const [displayElementPopupForUpdate, setDisplayElementPopupForUpdate] = useState(false);

    function updateBookButtonClickHandler() {
        setDisplayElementPopupForUpdate(true);
    }

    async function chosenElementCancelHandler() {

        //props.setDisplayElement(false);
        //props.setHideElement(false);
        setTimeout(() => {
            props.setDisplayElement(false);
            props.setHideElement(false);
            //console.log("i clicked the darn button");
        }, 50);
    }
    
    return (
        <div>
            {!displayElementPopupForUpdate && (
                <div className={styles.chosen_element_popup}>
                <div className={styles.chosen_element_popup_inner}>
                    <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                    <div id={styles.button_div}>
                        <button onClick={updateBookButtonClickHandler}>Update</button>
                        <button>Delete</button>
                        <button onClick={chosenElementCancelHandler}>Cancel</button>
                    </div>
                </div>
            </div>
            )}
            {displayElementPopupForUpdate && (
                <div>
                    <BookPopupForUpdate bookID={props.bookID} authorID={props.authorID} genreID={props.genreID} setDisplayElementPopupForUpdate={setDisplayElementPopupForUpdate} getBookList={props.getBookList} setDisplayElement={props.setDisplayElement} setHideElement={props.setHideElement}/>
                </div>
            )}
        </div>
    )

}

export default ChosenBook;