import React, { useState } from "react";

const AuthorList = (props) => {
    
    return (
        <div>
            <ul>{props.authorArray}</ul>
        </div>
    )
}

export default AuthorList;