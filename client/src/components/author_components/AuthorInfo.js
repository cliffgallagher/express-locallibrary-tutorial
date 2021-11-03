import React from "react";

const AuthorInfo = (props) => {

    return (
        <div>
            <p>{`${props.familyName}, ${props.firstName}`}</p>
            <p>Born: {new Date(props.dateOfBirth).toLocaleDateString()}</p>
            <p>Died: {props.dateOfDeath && new Date(props.dateOfDeath).toLocaleDateString()}</p>
        </div>
    )
}

export default AuthorInfo;