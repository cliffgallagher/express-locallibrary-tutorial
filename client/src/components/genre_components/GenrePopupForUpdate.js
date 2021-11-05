import React from "react";
import '../Popup.css';

const GenrePopupForUpdate = () => {
    return <div className='popup'>
    <div className='popup-inner'>
        <form>
            <label>Genre Name<input type='text' name='genreUpdateFormNameField'/></label>
        </form>
    </div>
</div>
}

export default GenrePopupForUpdate;