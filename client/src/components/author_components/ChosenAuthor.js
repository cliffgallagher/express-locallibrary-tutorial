import React, { useState } from 'react';
import styles from '../ChosenElement.module.css';
import AuthorInfo from './AuthorInfo.js';
import AuthorPopupForUpdate from './AuthorPopupForUpdate';

const ChosenAuthor = (props) => {
    const [displayElementPopupForUpdate, setDisplayElementPopupForUpdate] = useState(false);
    const [displayElementPopupForDelete, setDisplayElementPopupForDelete] = useState(false);
    
    function chosenAuthorCancelHandler() {
        setTimeout(() => {
            props.setDisplayChosenElement(false);
            props.setHideChosenElement(false);
            //console.log("i clicked the darn button");
        }, 50);
    }

    function chosenAuthorUpdateHandler() {
        setDisplayElementPopupForUpdate(true);
    }

    return (
        <div>
            {!displayElementPopupForUpdate && !displayElementPopupForDelete && (
                <div className={styles.chosen_element_popup}>
                    <div className={styles.chosen_element_popup_inner}>
                        <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                        <div id={styles.button_div}>
                            <button onClick={chosenAuthorUpdateHandler}>Update</button>
                            <button >Delete</button>
                            <button onClick={chosenAuthorCancelHandler}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {displayElementPopupForUpdate && (
                <AuthorPopupForUpdate setDisplayAuthorPopupForUpdate={setDisplayElementPopupForUpdate} authorID={props.authorIDForPopupForUpdate} getAuthorList={props.getAuthorList}/>
            )}

        </div>
    )
}

export default ChosenAuthor;