import React, { useState } from 'react';
import styles from '../ChosenElement.module.css';
import AuthorInfo from './AuthorInfo.js';
import AuthorPopupForUpdate from './AuthorPopupForUpdate';
import AuthorPopupForDelete from './AuthorPopupForDelete';

const ChosenAuthor = (props) => {
    const [displayElementPopupForUpdate, setDisplayElementPopupForUpdate] = useState(false);
    const [displayElementPopupForDelete, setDisplayElementPopupForDelete] = useState(false);
    
    function chosenAuthorCancelHandler() {
        setTimeout(() => {
            props.setDisplayChosenElement(false);
            props.setHideChosenElement(false);
        }, 50);
    }

    function chosenAuthorUpdateHandler() {
        setDisplayElementPopupForUpdate(true);
    }

    function chosenAuthorDeleteHandler() {
        setDisplayElementPopupForDelete(true);
    }

    return (
        <div>
            {!displayElementPopupForUpdate && !displayElementPopupForDelete && (
                <div className={styles.chosen_element_popup}>
                    <div className={styles.chosen_element_popup_inner}>
                        <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                        <div id={styles.button_div}>
                            <button onClick={chosenAuthorUpdateHandler}>Update</button>
                            <button onClick={chosenAuthorDeleteHandler}>Delete</button>
                            <button onClick={chosenAuthorCancelHandler}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {displayElementPopupForUpdate && (
                <AuthorPopupForUpdate setDisplayAuthorPopupForUpdate={setDisplayElementPopupForUpdate} authorID={props.authorIDForPopupForUpdate} getAuthorList={props.getAuthorList} setDisplayChosenElement={props.setDisplayChosenElement} setHideChosenElement={props.setHideChosenElement}/>
            )}
            {displayElementPopupForDelete && (
                <AuthorPopupForDelete setDisplayElementPopupForDelete={setDisplayElementPopupForDelete} authorID={props.authorIDForPopupForUpdate} getAuthorList={props.getAuthorList} setDisplayChosenElement={props.setDisplayChosenElement}/>
            )}
        </div>
    )
}

export default ChosenAuthor;