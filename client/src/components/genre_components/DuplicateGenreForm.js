import React from 'react';
import '../Popup.css';

const DuplicateGenreForm = (props) => {
    
    function duplicateGenreWarningCloseHandler(event) {
        event.preventDefault();
        props.setAddingDuplicateAuthor(false);
    }
    
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <form>
                    <p>Genre-name is already in the database</p>
                    <button onClick={duplicateGenreWarningCloseHandler}>Close</button>
                </form>
            </div>
        </div>
    )
}

export default DuplicateGenreForm;