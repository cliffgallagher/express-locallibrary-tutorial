import React from "react";
import styles from '../ChosenElement.module.css';
import BookInfo from "./BookInfo";

const ChosenBook = (props) => {
    
    async function chosenElementCancelHandler() {

        //props.setDisplayElement(false);
        //props.setHideElement(false);
        setTimeout(() => {
            props.setDisplayElement(false);
            props.setHideElement(false);
            console.log("i clicked the darn button");
        }, 50);
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

export default ChosenBook;