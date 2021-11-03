import React from "react";
import AuthorInfo from './AuthorInfo';

const AuthorListElement = (props) => {
    return (
        <div>
            <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
        </div>
    )
}

export default AuthorListElement;