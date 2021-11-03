import React from "react";

const AuthorInfo = (props) => {
    return (
        <div>
            <p>{`${props.familyName}, ${props.firstName}`}</p>
            <p>Born: {props.dateOfBirth}</p>
            <p>Died: {props.dateOfDeath}</p>
        </div>
    )
}

export default AuthorInfo;