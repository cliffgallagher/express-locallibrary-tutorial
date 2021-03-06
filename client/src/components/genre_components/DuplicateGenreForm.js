import React from 'react';
import styles from '../Popup.module.css';

const DuplicateGenreForm = (props) => {
    
    function duplicateGenreWarningCloseHandler(event) {
        event.preventDefault();
        props.setAddingDuplicateGenre(false);
        
    }
    
    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <form data-cy='duplicate_genre_form'>
                    <p>A genre named {props.duplicateGenreName} already exists in the database</p>
                    <div id={styles.button_div}>
                        <button onClick={duplicateGenreWarningCloseHandler}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DuplicateGenreForm;