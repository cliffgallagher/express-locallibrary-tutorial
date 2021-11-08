import React from "react";
import '../Popup.css';

const DuplicateAuthorWarning = (props) => {
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form >
                    <p>This author is already in the database</p>
                    <button type="submit">Yes</button>
                    <button className='close-button'>No</button>
                </form>
            </div>
        </div>
    )
}

export default DuplicateAuthorWarning;