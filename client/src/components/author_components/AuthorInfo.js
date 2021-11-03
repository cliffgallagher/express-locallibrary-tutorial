import React from "react";

const AuthorInfo = (props) => {
    return (
        <div>
            <p>{`${props.familyName}, ${props.firstName}`}</p>
            <p>Born: </p><date>{props.dateOfBirth}</date>
            <p>Died: </p><date>{props.dateOfDeath}</date>
        </div>
    )
}

export default AuthorInfo;