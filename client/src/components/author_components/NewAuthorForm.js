import React, { useState } from 'react';

const NewAuthorForm = (props) => {
    const [newAuthorFirstName, setNewAuthorFirstName] = useState();
    const [newAuthorFamilyName, setNewAuthorFamilyName] = useState();
    const [newAuthorBirthDate, setNewAuthorBirthDate] = useState();
    const [newAuthorDeathDate, setNewAuthorDeathDate] = useState();

    function newAuthorFormFirstNameChangeHandler(event) {
        setNewAuthorFirstName(event.target.value);
    }

    function newAuthorFormFamilyNameChangeHandler(event) {
        setNewAuthorFamilyName(event.target.value);
    }

    function newAuthorFormBirthChangeHandler(event) {
        setNewAuthorBirthDate(event.target.value);
    }

    function newAuthorFormDeathChangeHandler(event) {
        setNewAuthorDeathDate(event.target.value);
    }
    
    function newAuthorCancelButtonClickHandler() {
        props.hideNewAuthorForm();
    }

    async function newAuthorFormSubmitHandler(event) {
        event.preventDefault();
        const newAuthorFormInfo = {
            first_name: newAuthorFirstName,
            family_name: newAuthorFamilyName,
            dateOfBirth: newAuthorBirthDate,
            dateOfDeath: newAuthorDeathDate
        }

        props.passNewAuthorInfo(newAuthorFormInfo);

        //console.log("newAuthorFormInfo: " + JSON.stringify(newAuthorFormInfo));

        try {
            const response = await fetch('catalog/author/create/one', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAuthorFormInfo)
            });
            props.hideNewAuthorForm();
            const data = await response.json();
            console.log("data: " + data);
            if (data === "author already present in database") {
                //console.log("yes, author is in database");
                props.showDuplicateAuthorWarning();
            } else {
                //console.log("author not already in list, was inserted");
                props.getAuthorList();
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <div>
            <form onSubmit={newAuthorFormSubmitHandler}>
                <label>First Name<input type='text' name='newAuthorFormFirstNameInput' onChange={newAuthorFormFirstNameChangeHandler} value={newAuthorFirstName}/></label>
                <label>Family Name<input type='text' name='newAuthorFormFamilyNameInput' onChange={newAuthorFormFamilyNameChangeHandler} value={newAuthorFamilyName}/></label>
                <label>Date of Birth<input type='date' name='newAuthorFormBirthInput' onChange={newAuthorFormBirthChangeHandler} value={newAuthorBirthDate}/></label>
                <label>Date of Death<input type='date' name='newAuthorFormDeathInput' onChange={newAuthorFormDeathChangeHandler} value={newAuthorDeathDate}/></label>
                <button type='submit'>Submit</button>
                <button onClick={newAuthorCancelButtonClickHandler}>Cancel</button>
            </form> 
        </div>
    )
}

export default NewAuthorForm;