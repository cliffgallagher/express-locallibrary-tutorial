import React, { useState, useEffect } from "react";
import '../Popup.css';

const AuthorPopupForUpdate = (props) => {
    const [authorUpdateFormFirstNameValue, setAuthorUpdateFormFirstNameValue] = useState();
    const [authorUpdateFormFamilyNameValue, setAuthorUpdateFormFamilyNameValue] = useState();
    const [authorUpdateFormBirthValue, setAuthorUpdateFormBirthValue] = useState();
    const [authorUpdateFormDeathValue, setAuthorUpdateFormDeathValue] = useState();

    async function getInitialValues() {
        const response = await fetch(`catalog/author/${props.authorID}/update`);
        const data = await response.json();
        console.log(data);
        setAuthorUpdateFormFirstNameValue(data[0].first_name);
        setAuthorUpdateFormFamilyNameValue(data[0].family_name);
        setAuthorUpdateFormBirthValue((data[0].date_of_birth).slice(0, 10));
        data[0].date_of_death && setAuthorUpdateFormDeathValue((data[0].date_of_death).slice(0, 10));
    }

    useEffect(() => {
        getInitialValues();
    }, [])
    
    function popupForUpdateCloseButtonHandler() {
        props.setDisplayAuthorPopupForUpdate(false);
    }
    
    return <div className='popup'>
        <div className='popup-inner'>
            <form>
                <label>First Name<input type='text' name='authorUpdateFormFirstNameInput' value={authorUpdateFormFirstNameValue}/></label>
                <label>Family Name<input type='text' name='authorUpdateFormFamilyNameInput' value={authorUpdateFormFamilyNameValue}/></label>
                <label>Date of Birth<input type='date' name='authorUpdateFormBirthInput' value={authorUpdateFormBirthValue}/></label>
                <label>Date of Death<input type='date' name='authorUpdateFormDeathInput'value={authorUpdateFormDeathValue}/></label>
                <button type="submit">Update Author</button>
                <button className='close-button' onClick={popupForUpdateCloseButtonHandler}>Close</button>
            </form>
        </div>
    </div>
}

export default AuthorPopupForUpdate;