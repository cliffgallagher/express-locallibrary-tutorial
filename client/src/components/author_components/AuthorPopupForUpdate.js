import React from "react";
import '../Popup.css';

const AuthorPopupForUpdate = (props) => {
    
    function popupForUpdateCloseButtonHandler() {
        props.setDisplayAuthorPopupForUpdate(false);
    }
    
    return <div className='popup'>
        <div className='popup-inner'>
        <form>
                <label>Title<input type='text' name='updateFormTitleField'/></label>
                <button type="submit">Update Author</button>
                <button className='close-button' onClick={popupForUpdateCloseButtonHandler}>Close</button>
            </form>
        </div>
    </div>
}

export default AuthorPopupForUpdate;