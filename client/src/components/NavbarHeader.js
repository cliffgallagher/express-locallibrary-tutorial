import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './NavbarHeader.module.css';

const NavbarHeader = (props) => {

    function openNav() {
        //console.log("entered openNav");
        props.setDisplayNavbar(true);
    }
    
    return (
        <>
            <div className={styles.navbarHeader}>
                <FaBars className={styles.fabars} size={`1.5rem`} onClick={openNav}/>
            </div>
        </>

    )
}

export default NavbarHeader;