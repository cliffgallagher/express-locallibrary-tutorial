import React from 'react';
import styles from '../ChosenElement.module.css';
import AuthorInfo from './AuthorInfo.js';

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
                    <AuthorInfo firstName={props.firstName} familyName={props.familyName} dateOfBirth={props.dateOfBirth} dateOfDeath={props.dateOfDeath}/>
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