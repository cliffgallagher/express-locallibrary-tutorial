import React, { useState } from "react";
import AuthorInfo from './AuthorInfo';
import '../ListElement.css'

const AuthorListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);

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
        props.setDisplayAuthorPopupForDelete(true);
        //props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
        props.authorInfoToAuthorComponent(props.authorID);
    }
    
    return (
        <div className='listElement' onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}>
            {!displayUpdateAndDeleteButtons && <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>}
            {displayUpdateAndDeleteButtons && (
                <div>
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                    <button onClick={updateAuthorButtonClickHandler}>Update Author</button><button onClick={deleteAuthorButtonClickHandler}>Delete Author</button>
                </div>
            )}
        </div>
    )
}

export default AuthorListElement;