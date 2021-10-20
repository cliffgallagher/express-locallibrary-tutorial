import React from 'react';

const BookUpdateForm = (props) => {
    function bookUpdateFormCancelHandler() {

    }
    
    return <div>
        <p>BookUpdate form</p>
        <button onClick={props.onCancel}>Cancel</button>
    </div>
}

export default BookUpdateForm;