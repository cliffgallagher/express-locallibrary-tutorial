import React, { useState } from 'react';

const DisplaySelector = (props) => {

    function booksButtonClickHandler() {
        props.displayBookComponentFunction();
    }

    function authorsButtonClickHandler() {
        props.displayAuthorComponentFunction();
    }

    function genresButtonClickHandler() {
        props.displayGenreComponentFunction();
    }
    
    return (
        <div>
            <button onClick={booksButtonClickHandler}>Books</button>
            <button onClick={authorsButtonClickHandler}>Authors</button>
            <button onClick={genresButtonClickHandler}>Genres</button>
        </div>
    )
}

export default DisplaySelector;