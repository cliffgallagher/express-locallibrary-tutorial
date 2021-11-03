import React, { useState } from 'react';

const DisplaySelector = (props) => {

    function booksButtonClickHandler() {
        props.setDisplayBookComponent(true);
        props.setDisplayAuthorComponent(false);
        props.setDisplayGenreComponent(false);
    }

    function authorsButtonClickHandler() {
        props.setDisplayBookComponent(false);
        props.setDisplayAuthorComponent(true);
        props.setDisplayGenreComponent(false);
    }

    function genresButtonClickHandler() {
        props.setDisplayBookComponent(false);
        props.setDisplayAuthorComponent(false);
        props.setDisplayGenreComponent(true);
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