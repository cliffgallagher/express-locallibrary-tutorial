import React from 'react';
import styles from '../ChosenElement.module.css';

const ChosenAuthor = (props) => {
    
    function chosenAuthorCancelHandler() {
        setTimeout(() => {
            props.setDisplayChosenElement(false);
            props.setHideChosenElement(false);
            //console.log("i clicked the darn button");
        }, 50);
    }

    return (
        <div>
            
            <div className={styles.chosen_element_popup}>
                <div className={styles.chosen_element_popup_inner}>
                    <p>Chosen Author</p>
                    <div id={styles.button_div}>
                        <button >Update</button>
                        <button >Delete</button>
                        <button onClick={chosenAuthorCancelHandler}>Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChosenAuthor;