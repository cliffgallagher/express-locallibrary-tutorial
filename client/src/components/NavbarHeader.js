import React, { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import styles from './NavbarHeader.module.css';

const NavbarHeader = (props) => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    function openNav() {
        props.setDisplayNavbar(true);
    }

    function faSearchClickHandler() {
        if (!showSearchBar) {
            setShowSearchBar(true);
        } else {
            setShowSearchBar(false);
        }
    }

    function searchTextInputChangeHandler(event) {
        props.setSearchText(event.target.value);
    }

    function searchFormSubmitHandler(event) {
        event.preventDefault();
    }
    
    return (
        <>
            <div className={styles.navbarHeader}>
                <FaBars className={styles.fabars} size={`1.5rem`} onClick={openNav}/>
                <div className={styles.searchDiv}>
                    <form onSubmit={searchFormSubmitHandler}>
                        <input className={`${styles.searchDiv_form_input} ${showSearchBar && styles.show_search_bar}`} type='text' name='searchTextInput' onChange={searchTextInputChangeHandler}/>
                    </form>
                    <FaSearch id={styles.fasearchIcon} size={'1.5rem'} onClick={faSearchClickHandler}/>
                </div>
            </div>
        </>

    )
}

export default NavbarHeader;