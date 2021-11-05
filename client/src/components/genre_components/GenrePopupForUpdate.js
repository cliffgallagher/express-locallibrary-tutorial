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

    function genreUpdateFormNameChangeHandler(event) {
        setGenreUpdateFormNameValue(event.target.value);
    }

    async function genreUpdateFormSubmitHandler(event) {
        event.preventDefault();
        const genreName = {
            genreName: genreUpdateFormNameValue
        };
        try {
            await fetch(`catalog/genre/${props.genreID}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(genreName)
            });
            props.setDisplayGenrePopupForUpdate(false);
            props.getGenreList();
        } catch(e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getInitialGenreValues();
    }, []);
    
    return <div className='popup'>
    <div className='popup-inner'>
        <form onSubmit={genreUpdateFormSubmitHandler}>
            <label>Genre Name<input type='text' name='genreUpdateFormNameField' value={genreUpdateFormNameValue} onChange={genreUpdateFormNameChangeHandler}/></label>
            <button type='submit'>Update</button><button onClick={genreUpdateFormCancelButtonClickHandler}>Cancel</button>
        </form>
    </div>
</div>
}

export default GenrePopupForUpdate;