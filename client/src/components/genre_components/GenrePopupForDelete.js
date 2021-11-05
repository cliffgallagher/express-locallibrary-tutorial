import React, { useState, useEffect } from "react";
import '../Popup.css';

const GenrePopupForDelete = (props) => {
    const [genreToDelete, setGenreToDelete] = useState();

    async function getGenreDeleteFormValues() {
        try {
            const response = await fetch(`catalog/genre/${props.genreID}/delete`);
            const data = await response.json();
            //console.log(JSON.stringify(data));
            setGenreToDelete(data[0].name);
        } catch(e) {
            console.log(e);
        }
    }

    async function genreDeleteFormSubmitHandler(event) {
        event.preventDefault();
        const response = await fetch(`catalog/genre/${props.genreID}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(JSON.stringify(data));
        if (data === "SequelizeForeignKeyConstraintError") {
            
        } else {
            props.setDisplayGenrePopupForDelete(false);
            props.getGenreList();
        }
    }

    useEffect(() => {
        getGenreDeleteFormValues();
    }, []);
    
    function genreDeleteFormCancelHandler() {
        props.setDisplayGenrePopupForDelete(false);
    }

    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form onSubmit={genreDeleteFormSubmitHandler}>
                    <p>Are you sure you wish to delete this genre?</p>
                    <h1>{genreToDelete}</h1>
                    <button type='submit'>Delete</button><button onClick={genreDeleteFormCancelHandler}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default GenrePopupForDelete;