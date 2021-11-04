import React, { useState, useEffect } from "react";
import '../Popup.css';

const AuthorPopupForUpdate = (props) => {
    const [authorUpdateFormFirstNameValue, setAuthorUpdateFormFirstNameValue] = useState();
    const [authorUpdateFormFamilyNameValue, setAuthorUpdateFormFamilyNameValue] = useState();
    const [authorUpdateFormBirthValue, setAuthorUpdateFormBirthValue] = useState();
    const [authorUpdateFormDeathValue, setAuthorUpdateFormDeathValue] = useState();

    async function getInitialValues() {
        try {
            const response = await fetch(`catalog/author/${props.authorID}/update`);
            const data = await response.json();
            //console.log(data);
            setAuthorUpdateFormFirstNameValue(data[0].first_name);
            setAuthorUpdateFormFamilyNameValue(data[0].family_name);
            setAuthorUpdateFormBirthValue((data[0].date_of_birth).slice(0, 10));
            data[0].date_of_death && setAuthorUpdateFormDeathValue((data[0].date_of_death).slice(0, 10));
        } catch(e) {
            console.log(e);
        }
        
    }

    async function authorUpdateFormSubmitHandler(event) {
        event.preventDefault();
        const updatedAuthorData = {
            firstName: authorUpdateFormFirstNameValue,
            familyName: authorUpdateFormFamilyNameValue,
            birthDate: authorUpdateFormBirthValue,
            deathDate: authorUpdateFormDeathValue
        }
        //console.log(JSON.stringify(updatedAuthorData));
        try {
            await fetch(`catalog/author/${props.authorID}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAuthorData)
            });
        } catch(e) {
            console.log(e);
        }
        props.setDisplayAuthorPopupForUpdate(false);
        props.getAuthorList();
    }

    useEffect(() => {
        getInitialValues();
    }, [])

    function authorUpdateFormFirstNameChangeHandler(event) {
        setAuthorUpdateFormFirstNameValue(event.target.value);
    }

    function authorUpdateFormFamilyNameChangeHandler(event) {
        setAuthorUpdateFormFamilyNameValue(event.target.value);
    }

    function authorUpdateFormBirthDateChangeHandler(event) {
        setAuthorUpdateFormBirthValue(event.target.value);
    }

    function authorUpdateFormDeathDateChangeHandler(event) {
        setAuthorUpdateFormDeathValue(event.target.value);
    }
    
    function popupForUpdateCloseButtonHandler() {
        props.setDisplayAuthorPopupForUpdate(false);
    }
    
    return <div className='popup'>
        <div className='popup-inner'>
            <form onSubmit={authorUpdateFormSubmitHandler}>
                <label>First Name<input type='text' name='authorUpdateFormFirstNameInput' value={authorUpdateFormFirstNameValue} onChange={authorUpdateFormFirstNameChangeHandler}/></label>
                <label>Family Name<input type='text' name='authorUpdateFormFamilyNameInput' value={authorUpdateFormFamilyNameValue} onChange={authorUpdateFormFamilyNameChangeHandler}/></label>
                <label>Date of Birth<input type='date' name='authorUpdateFormBirthInput' value={authorUpdateFormBirthValue} onChange={authorUpdateFormBirthDateChangeHandler}/></label>
                <label>Date of Death<input type='date' name='authorUpdateFormDeathInput'value={authorUpdateFormDeathValue} onChange={authorUpdateFormDeathDateChangeHandler}/></label>
                <button type="submit">Update Author</button>
                <button className='close-button' onClick={popupForUpdateCloseButtonHandler}>Close</button>
            </form>
        </div>
    </div>
}

export default AuthorPopupForUpdate;