import React, { useState } from "react";
import AuthorInfo from './AuthorInfo';
import '../ListElement.css'

const AuthorListElement = (props) => {
    const [displayUpdateAndDeleteButtons, setDisplayUpdateAndDeleteButtons] = useState(false);

    function showUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(true);
    }

    function hideUpdateAndDeleteButtons() {
        setDisplayUpdateAndDeleteButtons(false);
    }

    function updateBookButtonClickHandler() {
        props.setDisplayBookPopupForUpdate(true);
        props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
    }

    function deleteBookButtonClickHandler() {
        props.setDisplayBookPopupForDelete(true);
        props.bookPropsFromBookListElementToBookComponent(props.bookID, props.authorID, props.genreID);
    }
    
    return (
        <div className='listElement' onMouseEnter={showUpdateAndDeleteButtons} onMouseLeave={hideUpdateAndDeleteButtons}>
            {!displayUpdateAndDeleteButtons && <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>}
            {displayUpdateAndDeleteButtons && (
                <div>
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
                    <button>Update Author</button><button>Delete Author</button>
                </div>
            )}
        </div>
    )
}

export default AuthorListElement;