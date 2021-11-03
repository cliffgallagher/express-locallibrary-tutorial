import React from "react";
import '../Popup.css';

const AuthorPopupForUpdate = () => {
    return <div className='popup'>
        <div className='popup-inner'>
            <form>
                <h1>Are you sure you want to delete this book?</h1>
                
                <button type="submit">Delete</button><button>Close</button>
            </form>
        </div>
    </div>
}

export default AuthorPopupForUpdate;