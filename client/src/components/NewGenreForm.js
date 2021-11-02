import React, { useState } from 'react';

const NewGenreForm = (props) => {
    
    function newGenreFormCancelButtonClickHandler() {
        props.hideNewGenreForm();
    }
    
    return (
        <div>
            <form>
                <label>Genre Name<input type='text' name='newGenreFormNameInput'/></label>
                <button type='submit'>Submit</button>
                <button onClick={newGenreFormCancelButtonClickHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default NewGenreForm;