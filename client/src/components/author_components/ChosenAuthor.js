import React from 'react';
import styles from '../ChosenElement.module.css';

const ChosenAuthor = () => {
    return (
        <div>
            
            <div className={styles.chosen_element_popup}>
                <div className={styles.chosen_element_popup_inner}>
                    <p>Chosen Author</p>
                </div>
            </div>

        </div>
    )
}

export default ChosenAuthor;