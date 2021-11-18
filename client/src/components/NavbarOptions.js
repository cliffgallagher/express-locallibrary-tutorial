import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './NavbarOptions.module.css';

const NavbarOptions = () => {
    
    function helloBooks() {
        console.log("hello books");
    }

    function helloAuthors() {
        console.log("hello authors");
    }
    
    return (
        <div className={styles.navbar}>
            <AiOutlineClose className={styles.closeXButton} size={'1.5rem'}/>
            <ul>
                <p onClick={helloBooks}>Books</p>
                <p onClick={helloAuthors}>Authors</p>
                <p>Genres</p>
            </ul>
        </div>
    )
}

export default NavbarOptions;