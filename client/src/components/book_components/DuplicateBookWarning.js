import React from 'react';
import '../Popup.css';

const DuplicateBookWarning = (props) => {
    console.log("rendered duplicatebookwarning");
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form>
                    <p>A book with this title already exists in the database. Insert anyway?</p>
                    <button type="submit">Yes</button>
                    <button className='close-button'>No</button>
                </form>
            </div>
        </div>
    )
}

export default DuplicateBookWarning;