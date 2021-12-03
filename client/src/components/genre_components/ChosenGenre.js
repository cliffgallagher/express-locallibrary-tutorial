import React, { useState } from 'react';
import styles from '../ChosenElement.module.css';
import GenreInfo from './GenreInfo';
import GenrePopupForUpdate from './GenrePopupForUpdate';

const ChosenGenre = (props) => {
    const [displayElementPopupForDelete, setDisplayElementPopupForDelete] = useState(false);
    const [displayElementPopupForUpdate, setDisplayElementPopupForUpdate] = useState(false);

    function chosenElementCancelHandler() {
            setTimeout(() => {
                props.setHideChosenElement(false);
                props.setDisplayChosenElement(false);
        }, 50);
    }

    function chosenElementUpdateHandler() {
        setDisplayElementPopupForUpdate(true);
    }
    
        return (
            <div>
                {!displayElementPopupForUpdate && (
                    <div className={styles.chosen_element_popup}>
                        <div className={styles.chosen_element_popup_inner}>
                            <GenreInfo genreName={props.genreName}/>
                            <div id={styles.button_div}>
                                <button onClick={chosenElementUpdateHandler}>Update</button>
                                <button>Delete</button>
                                <button onClick={chosenElementCancelHandler}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                {displayElementPopupForUpdate && (
                    <div>
                        <GenrePopupForUpdate setDisplayElementPopupForUpdate={setDisplayElementPopupForUpdate} genreID={props.genreID} getGenreList={props.getGenreList} setHideChosenElement={props.setHideChosenElement} setDisplayChosenElement={props.setDisplayChosenElement}/>
                    </div>
                )}
            </div>

    ) 
}

export default ChosenGenre;