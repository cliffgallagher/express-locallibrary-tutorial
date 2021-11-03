import React from 'react';

const AuthorPopupForDelete = (props) => {
    
    function popupForDeleteCloseButtonHandler() {
        props.displayAuthorPopupForDelete(false);
    }
    
    return <div className='popup'>
    <div className='popup-inner'>
        <form>
            <h1>Are you sure you want to delete this author?</h1>
            <h3>Name: </h3>
            <h3>Date of Birth: </h3>
            <h3>Died: </h3>
            <button type="submit">Delete Author</button>
            <button className='close-button' onClick={popupForDeleteCloseButtonHandler}>Close</button>
        </form>
    </div>
</div>
}

export default AuthorPopupForDelete;