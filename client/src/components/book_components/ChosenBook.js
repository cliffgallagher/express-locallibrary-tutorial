import React from "react";
import styles from '../ChosenElement.module.css';
import BookInfo from "./BookInfo";

const ChosenElement = (props) => {
    
    function chosenElementCancelHandler() {
        props.getBookList();
    }
    
    return (
        <div className={styles.chosen_element_popup}>
            <div className={styles.chosen_element_popup_inner}>
                <BookInfo title={props.title} author={props.author} isbn={props.isbn} genreName={props.genreName} summary={props.summary}/>
                <div id={styles.button_div}>
                    <button>Update</button>
                    <button>Delete</button>
                    <button onClick={chosenElementCancelHandler}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ChosenElement;