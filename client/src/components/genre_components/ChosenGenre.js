import React, { useState } from 'react';
import styles from '../ChosenElement.module.css';
import GenreInfo from './GenreInfo';
import GenrePopupForUpdate from './GenrePopupForUpdate';
import GenrePopupForDelete from './GenrePopupForDelete';

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

    function chosenElementDeleteHandler() {
        setDisplayElementPopupForDelete(true);
    }
    
        return (
            <div>
                {!displayElementPopupForUpdate && !displayElementPopupForDelete && (
                    <div className={styles.chosen_element_popup}>
                        <div className={styles.chosen_element_popup_inner}>
                            <GenreInfo genreName={props.genreName}/>
                            <div id={styles.button_div}>
                                <button onClick={chosenElementUpdateHandler}>Update</button>
                                <button onClick={chosenElementDeleteHandler}>Delete</button>
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
                {displayElementPopupForDelete && (
                    <div>
                        <GenrePopupForDelete genreID={props.genreID} getGenreList={props.getGenreList} setDisplayElementPopupForDelete={setDisplayElementPopupForDelete} setHideChosenElement={props.setHideChosenElement} setDisplayChosenElement={props.setDisplayChosenElement}/>
                    </div>
                )}
            </div>

    ) 
}

export default ChosenGenre;