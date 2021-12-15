import React, { useEffect, useState, useContext } from "react";
import AuthorInfo from './AuthorInfo';
import styles from '../ListElement.module.css'
import ChosenAuthor from './ChosenAuthor.js';
import { AuthContext } from "../../context/auth-context";

const AuthorListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);
    const [hideChosenElement, setHideChosenElement] = useState(false);
    const [displayChosenElement, setDisplayChosenElement] = useState(false);
    const [gridOrder, setGridOrder] = useState(false);
    const auth = useContext(AuthContext);
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

    function searchForSearchText() {
        if (auth.searchText) {
            if (auth.searchText.length > 0 ) {
                const searchTextToLowerCase = auth.searchText.toLowerCase();
                if (!(props.firstName.toLowerCase().includes(searchTextToLowerCase)) && !(props.familyName.toLowerCase().includes(searchTextToLowerCase))) {
                    //console.log('no such text found');
                    setHideChosenElement(true);
                    setGridOrder(true);
                } else {
                    setHideChosenElement(false);
                    setGridOrder(false);
                }
            } else {
                setHideChosenElement(false);
                setGridOrder(false);
            }
        } else {
            setHideChosenElement(false);
            setGridOrder(false);
        }
    }

    useEffect(() => {
        searchForSearchText();
    }, [auth.searchText]);
    
    return (
        <div className={`${styles.listElement} ${hideChosenElement ? styles.hideElement: ''} ${gridOrder ? styles.gridOrder : ''}`} onClick={clickElementHandler}/*{styles.listElement} onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}*/>
            {!displayChosenElement && (
                <div>
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                </div>
            )}
            {displayChosenElement && (
                <div>
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                    <ChosenAuthor firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath} setDisplayChosenElement={setDisplayChosenElement} setHideChosenElement={setHideChosenElement} getAuthorList={props.getAuthorList} authorIDForPopupForUpdate={props.authorID}/>
                </div>
            )}
        </div>
    )
}

export default AuthorListElement;