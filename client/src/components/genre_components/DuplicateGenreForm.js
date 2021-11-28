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
                <form>
                    <p>Genre-name is already in the database</p>
                    <div id={styles.button_div}>
                        <button onClick={duplicateGenreWarningCloseHandler}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DuplicateGenreForm;