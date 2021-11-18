import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './NavbarHeader.module.css';

const NavbarHeader = () => {

    function sayHello() {
        console.log("hi I'm fabars");
    }
    
    return (
        <>
            <div className={styles.navbarHeader}>
                <FaBars className={styles.fabars} size={28} onClick={sayHello}/>
            </div>
        </>

    )
}

export default NavbarHeader;