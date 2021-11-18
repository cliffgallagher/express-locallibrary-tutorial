import React, { useState } from 'react';
import Navbar from './Navbar';
import NavbarOptions from './NavbarOptions';

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
            <Navbar />
            <NavbarOptions />
            <button onClick={booksButtonClickHandler}>Books</button>
            <button onClick={authorsButtonClickHandler}>Authors</button>
            <button onClick={genresButtonClickHandler}>Genres</button>
        </div>
    )
}

export default DisplaySelector;