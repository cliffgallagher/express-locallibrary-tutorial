import React, { useState } from "react";
import AuthorInfo from './AuthorInfo';
import styles from '../ListElement.module.css'
import ChosenAuthor from './ChosenAuthor.js';

const AuthorListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);
    const [hideChosenElement, setHideChosenElement] = useState(false);
    const [displayChosenElement, setDisplayChosenElement] = useState(false);

    //console.log('date of birth in AuthorListElement: ' + props.dateOfBirth);
    function showUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(true);
    }

    function hideUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(false);
    }

    function updateAuthorButtonClickHandler() {
        props.setDisplayAuthorPopupForUpdate(true);
        //props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
        props.authorInfoToAuthorComponent(props.authorID);
    }

    function deleteAuthorButtonClickHandler() {
        props.setDisplayAuthors(false);
        props.setDisplayAuthorPopupForDelete(true);
        //props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
        props.authorInfoToAuthorComponent(props.authorID);
    }

    function clickElementHandler() {
        if(!displayChosenElement) {
            setDisplayChosenElement(true);
            setHideChosenElement(true);
        }
    }
    
    return (
        <div className={`${styles.listElement} ${hideChosenElement ? styles.hideElement: ''}`} onClick={clickElementHandler}/*{styles.listElement} onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}*/>
            {!displayChosenElement && (
                <div>
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                </div>
            )}
            {displayChosenElement && (
                <div>
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                    <ChosenAuthor firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath} setDisplayChosenElement={setDisplayChosenElement} setHideChosenElement={setHideChosenElement}/>
                </div>
            )}
        </div>
    )
}

export default AuthorListElement;