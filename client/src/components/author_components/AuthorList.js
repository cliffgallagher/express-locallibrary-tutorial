import React, { useState } from "react";

const AuthorList = () => {
    const [authorArray, setAuthorArray] = useState();
    
    return (
        <div>
            <ul>{authorArray}</ul>
        </div>
    )
}

export default AuthorList;