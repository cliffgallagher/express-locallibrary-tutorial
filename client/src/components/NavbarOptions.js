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

    function genressOptionClickHandler() {
        props.displayGenreComponentFunction();
        props.setDisplayNavbar(false);
    }

    function xbuttonClickHandler() {
        props.setDisplayNavbar(false);
    }
    
    return (
        <div className={`${styles.navbar} ${props.displayNavbar && styles.displayNavbar}`}>
            <AiOutlineClose className={styles.closeXButton} size={'1.5rem'} onClick={xbuttonClickHandler}/>
            <ul>
                <p onClick={booksOptionClickHandler}>Books</p>
                <p onClick={authorsOptionClickHandler}>Authors</p>
                <p onClick={genressOptionClickHandler}>Genres</p>
            </ul>
        </div>
    )
}

export default NavbarOptions;