import React from "react";
import styles from './ChosenElement.module.css';

const ChosenElement = () => {
    return (
        <div className={styles.chosen_element_popup}>
            <div className={styles.chosen_element_popup_inner}>
                <p>Chosen Element</p>
            </div>
        </div>
    )
}

export default ChosenElement;