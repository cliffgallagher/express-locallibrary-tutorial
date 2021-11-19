import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './NavbarOptions.module.css';

const NavbarOptions = (props) => {
    console.log("displayNavbar is true or false: " + props.displayNavbar);
    
    function helloBooks() {
        console.log("hello books");
    }

    function helloAuthors() {
        console.log("hello authors");
    }

    function xbuttonClickHandler() {
        props.setDisplayNavbar(false);
    }
    
    return (
        <div className={`${styles.navbar} ${props.displayNavbar && styles.displayNavbar}`}>
            <AiOutlineClose className={styles.closeXButton} size={'1.5rem'} onClick={xbuttonClickHandler}/>
            <ul>
                <p onClick={helloBooks}>Books</p>
                <p onClick={helloAuthors}>Authors</p>
                <p>Genres</p>
            </ul>
        </div>
    )
}

export default NavbarOptions;