import React, { useEffect, useState, useContext } from "react";
import AuthorInfo from './AuthorInfo';
import styles from '../ListElement.module.css'
import ChosenAuthor from './ChosenAuthor.js';
import { AuthContext } from "../../context/auth-context";

const AuthorListElement = (props) => {

    const [hideChosenElement, setHideChosenElement] = useState(false);
    const [displayChosenElement, setDisplayChosenElement] = useState(false);
    const [gridOrder, setGridOrder] = useState(false);
    const auth = useContext(AuthContext);

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
                const searchableBirthDate = props.dateOfBirth.slice(5,10) + '-' + props.dateOfBirth.slice(0,4);
                const authorFullName = props.firstName + ' ' + props.familyName;
                const authorLastNameCommaFirst = props.familyName + ', ' + props.firstName;
                const authorLastNameFirst = props.familyName + ' ' + props.firstName;

                if (!(props.firstName.toLowerCase().includes(searchTextToLowerCase)) && !(props.familyName.toLowerCase().includes(searchTextToLowerCase)) && !(searchableBirthDate.includes(searchTextToLowerCase)) && !(authorFullName.toLowerCase().includes(searchTextToLowerCase)) && !(authorLastNameCommaFirst.toLowerCase().includes(searchTextToLowerCase)) && !(authorLastNameFirst.toLowerCase().includes(searchTextToLowerCase))) {
                    if (props.dateOfDeath) {
                        const searchableDeathDate = props.dateOfDeath.slice(5,10) + '-' + props.dateOfDeath.slice(0,4);
                        if (!(searchableDeathDate.includes(searchTextToLowerCase))) {
                            setHideChosenElement(true);
                            setGridOrder(true);
                        } else {
                            setHideChosenElement(false);
                            setGridOrder(false); 
                        }
                    } else {
                        setHideChosenElement(true);
                        setGridOrder(true);
                    }
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
        <div className={`${styles.listElement} ${hideChosenElement ? styles.hideElement: ''} ${gridOrder ? styles.gridOrder : ''}`} onClick={clickElementHandler}>
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