import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './NavbarOptions.module.css';

const NavbarOptions = (props) => {
    //console.log("displayNavbar is true or false: " + props.displayNavbar);
    
    function booksOptionClickHandler() {
        //console.log("hello books");
        props.displayBookComponentFunction();
        props.setDisplayNavbar(false);
    }

    function authorsOptionClickHandler() {
        //console.log("hello authors");
        props.displayAuthorComponentFunction();
        props.setDisplayNavbar(false);
    }

    function genresOptionClickHandler() {
        props.displayGenreComponentFunction();
        props.setDisplayNavbar(false);
    }

    function xbuttonClickHandler() {
        props.setDisplayNavbar(false);
    }

    async function logoutOptionClickHandler() {
        const response = await fetch('users/logout', {
            method: 'POST'
        });
        props.setDisplayNavbar(false);
        props.setIsLoggedIn(false);
    }
    
    return (
        <div className={`${styles.navbar} ${props.displayNavbar && styles.displayNavbar}`}>
            <AiOutlineClose className={styles.closeXButton} size={'1.5rem'} onClick={xbuttonClickHandler}/>
            <ul>
                <p onClick={booksOptionClickHandler}>Books</p>
                <p onClick={authorsOptionClickHandler}>Authors</p>
                <p onClick={genresOptionClickHandler}>Genres</p>
            </ul>
            <div id={styles.bottom_div}>
                <p onClick={logoutOptionClickHandler}>Logout</p>
            </div>
        </div>
    )
}

export default NavbarOptions;