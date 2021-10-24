import React from 'react';
import './PopupForUpdate.css';

const PopupForUpdate = (props) => {

    function popupForUpdateCancelButtonHandler(event) {
        props.popupForUpdateHandler(false);
    }

    return <div className='popup'>
        <div className='popup-inner'>
            <button className='close-button' onClick={popupForUpdateCancelButtonHandler}>Cancel</button>
            {props.children}
        </div>
    </div>
}

export default PopupForUpdate;