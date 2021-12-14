import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
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
                <FaSearch className={styles.fasearch} size={'1.5rem'}/>
            </div>
        </>

    )
}

export default NavbarHeader;