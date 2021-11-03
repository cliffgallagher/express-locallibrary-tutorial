import React from "react";
import AuthorInfo from './AuthorInfo';
import '../ListElement.css'

const AuthorListElement = (props) => {
    return (
        <div className='listElement'>
            <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
        </div>
    )
}

export default AuthorListElement;