import React, { useEffect, useContext, useState } from "react";
import GenreInfo from './GenreInfo';
import styles from '../ListElement.module.css';
import ChosenGenre from './ChosenGenre.js';
import { AuthContext } from "../../context/auth-context";

const GenreListItem = (props) => {
    const [showUpdateAndDeleteButtons, setShowUpdateAndDeleteButtons] = useState(false);
    const [displayChosenElement, setDisplayChosenElement] = useState(false);
    const [hideChosenElement, setHideChosenElement] = useState(false);
    const [gridOrder, setGridOrder] = useState();
    const auth = useContext(AuthContext);

    function mouseEnterGenreListItemHandler() {
        setShowUpdateAndDeleteButtons(true);
    }

    function mouseLeaveGenreListItemHandler() {
        setShowUpdateAndDeleteButtons(false);
    }

    function updateGenreButtonClickHandler() {
        props.setDisplayGenrePopupForUpdate(true);
        props.receiveGenreID(props.genreID);
    }

    function deleteGenreButtonHandler() {
        props.setDisplayGenrePopupForDelete(true);
        props.receiveGenreID(props.genreID);
    }

    function clickElementHandler() {
        setDisplayChosenElement(true);
        setHideChosenElement(true);
    }

    function searchForSearchText() {
        if (auth.searchText) {
            if (auth.searchText.length > 0 ) {
                const searchTextToLowerCase = auth.searchText.toLowerCase();
                if (!(props.genreName.toLowerCase().includes(searchTextToLowerCase))) {
                    //console.log('no such text found');
                    setHideChosenElement(true);
                    setGridOrder(true);
                } else {
                    setHideChosenElement(false);
                    setGridOrder(false);
                }
            } else {
                setHideChosenElement(false);
                setGridOrder(false);
            }
        } else {
            setHideChosenElement(false);
            setGridOrder(false);
        }
    }

    useEffect(() => {
        searchForSearchText();
    }, [auth.searchText]);
    
    return (
        <div className={`${styles.listElement} ${hideChosenElement ? styles.hideElement: ''} ${gridOrder ? styles.gridOrder : ''}`} onClick={clickElementHandler}>
            {!displayChosenElement && (
                <GenreInfo genreName={props.genreName}/>
            )}
            {displayChosenElement && (
                <div>
                    <GenreInfo genreName={props.genreName}/>
                    <ChosenGenre genreName={props.genreName} setDisplayChosenElement={setDisplayChosenElement} setHideChosenElement={setHideChosenElement} genreID={props.genreID} getGenreList={props.getGenreList}/>
                </div>

            )}
        </div>
    )
}

export default GenreListItem;