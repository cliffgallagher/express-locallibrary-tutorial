import React from 'react';

const NewAuthorForm = (props) => {
    
    function newAuthorCancelButtonClickHandler() {
        props.hideNewAuthorForm();
    }
    
    return (
        <div>
            <form>
                <label>First Name<input type='text' name='newAuthorFormFirstNameInput'/></label>
                <label>Family Name<input type='text' name='newAuthorFormFamilyNameInput'/></label>
                <label>Date of Birth<input type='date' name='newAuthorFormDOBInput'/></label>
                <label>Date of Death<input type='date' name='newAuthorFormDODInput'/></label>
                <button type='submit'>Submit</button>
                <button onClick={newAuthorCancelButtonClickHandler}>Cancel</button>
            </form> 
        </div>
    )
}

export default NewAuthorForm;