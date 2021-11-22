import React, { useState } from 'react';
import styles from "../NewElementForm.module.css";

const NewAuthorForm = (props) => {
    const [newAuthorFirstName, setNewAuthorFirstName] = useState();
    const [newAuthorFamilyName, setNewAuthorFamilyName] = useState();
    const [newAuthorBirthDate, setNewAuthorBirthDate] = useState();
    const [newAuthorDeathDate, setNewAuthorDeathDate] = useState();
    const [validationErrors, setValidationErrors] = useState();

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
            //console.log("data: " + data);
            /*if (data === "author already present in database") {
                //console.log("yes, author is in database");
                props.showDuplicateAuthorWarning();
            } else {
                //console.log("author not already in list, was inserted");
                props.getAuthorList();*/
                if (typeof data === 'object') {
                    if (data.hasOwnProperty('errors')) {
                        //console.log("data.errors: " + JSON.stringify(data.errors));
                        const errorMessages = data.errors.map(element => element.msg);
                        if (errorMessages.includes("author already in database")) {
                            props.showDuplicateAuthorWarning(true);
                        } else {
                            //console.log("errorMessages: " + JSON.stringify(errorMessages));
                            setValidationErrors(() => {
                                return errorMessages.map(element => <li>{element}</li>);
                            });
                        }
                        //console.log("errorMessages: " + JSON.stringify(errorMessages));
                    } else {
                        props.getAuthorList();
                        return response;
                    }
                }
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <div>
            <form id={styles.newElementForm} onSubmit={newAuthorFormSubmitHandler}>
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