import React from 'react';
import './PopupForUpdate.css';

const PopupForUpdate = (props) => {
    return <div className='popup'>
        <div className='popup-inner'>
            <button className='close-button'>Close</button>
            {props.children}
        </div>
    </div>
}

export default PopupForUpdate;