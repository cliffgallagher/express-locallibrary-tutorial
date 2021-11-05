import React from "react";
import '../Popup.css';

const GenrePopupForDelete = (props) => {
    
    function genreDeleteFormCancelHandler() {
        props.setDisplayGenrePopupForDelete(false);
    }

    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form>
                    
                    <button type='submit'>Update</button><button onClick={genreDeleteFormCancelHandler}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default GenrePopupForDelete;