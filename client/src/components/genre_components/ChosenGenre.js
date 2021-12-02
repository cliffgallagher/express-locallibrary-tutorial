import React, { useState } from 'react';
import styles from '../ChosenElement.module.css';
import GenreInfo from './GenreInfo';

const ChosenGenre = (props) => {
   return (
        <div className={styles.chosen_element_popup}>
            <div className={styles.chosen_element_popup_inner}>
                <GenreInfo genreName={props.genreName}/>
                <div id={styles.button_div}>
                    <button>Update</button>
                    <button>Delete</button>
                    <button >Cancel</button>
                </div>
            </div>
        </div>
   ) 
}

export default ChosenGenre;