import React from "react";

const NewGenreForm = (props) => {
    
    function newGenreFormCancelButtonHandler() {
        props.setAddNewGenre(false);
    }

    return (
        <div>
            <form>
                <label>New Genre Name<input type='text' name='newGenreFormNameField'/></label>
                <button>Submit Genre</button>
                <button onClick={newGenreFormCancelButtonHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default NewGenreForm;