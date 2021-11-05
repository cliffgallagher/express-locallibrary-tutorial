import React, { useState, useEffect } from "react";
import '../Popup.css';

const GenrePopupForUpdate = (props) => {
    const [genreUpdateFormNameValue, setGenreUpdateFormNameValue] = useState();

    async function getInitialGenreValues() {
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/update`);
            const data = await response.json();
            setGenreUpdateFormNameValue(data[0].name);
        } catch(e) {
            console.log(e);
        }
    }
    
    function genreUpdateFormCancelButtonClickHandler() {
        props.setDisplayGenrePopupForUpdate(false);
    }

    useEffect(() => {
        getInitialGenreValues();
    }, []);
    
    return <div className='popup'>
    <div className='popup-inner'>
        <form>
            <label>Genre Name<input type='text' name='genreUpdateFormNameField' value={genreUpdateFormNameValue}/></label>
            <button>Update</button><button onClick={genreUpdateFormCancelButtonClickHandler}>Cancel</button>
        </form>
    </div>
</div>
}

export default GenrePopupForUpdate;