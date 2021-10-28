import React from 'react';
import './PopupForUpdate.css';

const PopupForDelete = (props) => {

    function popupForDeleteHandler() {
        props.popupForDeleteHandler(false);
    }

    return <div className='popup'>
        <div className='popup-inner'>
            <p>Popup For Delete</p>
            <button onClick={popupForDeleteHandler}>Close</button>
        </div>
    </div>
}

export default PopupForDelete;