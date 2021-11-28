import React, { useState, useEffect } from "react";
import styles from '../ElementPopupForUpdate.module.css';

const AuthorPopupForUpdate = (props) => {
    const [authorUpdateFormFirstNameValue, setAuthorUpdateFormFirstNameValue] = useState();
    const [authorUpdateFormFamilyNameValue, setAuthorUpdateFormFamilyNameValue] = useState();
    const [authorUpdateFormBirthValue, setAuthorUpdateFormBirthValue] = useState();
    const [authorUpdateFormDeathValue, setAuthorUpdateFormDeathValue] = useState();
    const [displayDuplicateWarning, setDisplayDuplicateWarning] = useState(false);
    const [initialFirstName, setInitialFirstName] = useState();
    const [initialLastName, setInitialLastName] = useState();
    const [validationErrors, setValidationErrors] = useState();

    async function getInitialValues() {
        try {
            const response = await fetch(`catalog/author/${props.authorID}/update`);
            const data = await response.json();
            //console.log(data);
            setAuthorUpdateFormFirstNameValue(data[0].first_name);
            setAuthorUpdateFormFamilyNameValue(data[0].family_name);
            setAuthorUpdateFormBirthValue((data[0].date_of_birth).slice(0, 10));
            data[0].date_of_death && setAuthorUpdateFormDeathValue((data[0].date_of_death).slice(0, 10));
            setInitialFirstName(data[0].first_name);
            setInitialLastName(data[0].family_name);
        } catch(e) {
            console.log(e);
        }
        
    }

    const updateAuthorNameCheck = async (updatedAuthorData) => {
        try {
            const response = await fetch(`catalog/author/${props.authorID}/update/one`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAuthorData)
            });
            const data = await response.json();
            //console.log("data in AuthorPopupForUpdate: " + data);
            /*if (data === "author already present in database") {
                setDisplayDuplicateWarning(true);
            } else {
                props.setDisplayAuthorPopupForUpdate(false);
                props.getAuthorList();
            }*/
            if (typeof data === 'object') {
                if (data.hasOwnProperty('errors')) {
                    //console.log("data.errors: " + JSON.stringify(data.errors));
                    const errorMessages = data.errors.map(element => element.msg);
                    if (errorMessages.includes("author already in database")) {
                        setDisplayDuplicateWarning(true);
                    } else {
                        //console.log("errorMessages: " + JSON.stringify(errorMessages));
                        setValidationErrors(() => {
                            return errorMessages.map(element => <li>{element}</li>);
                        });
                    }
                    //console.log("errorMessages: " + JSON.stringify(errorMessages));
                } else {
                    props.setDisplayAuthorPopupForUpdate(false);
                    props.getAuthorList();
                    return response;
                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    const updateAuthorNoNameCheck = async (updatedAuthorData) => {
        try {
            const response = await fetch(`catalog/author/${props.authorID}/update/two`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAuthorData)
            });
            setDisplayDuplicateWarning(false);
            props.setDisplayAuthorPopupForUpdate(false);
            props.getAuthorList();

        } catch(e) {
            console.log(e);
        }
    }

    async function authorUpdateFormSubmitHandler(event) {
        event.preventDefault();
        const updatedAuthorData = {
            first_name: authorUpdateFormFirstNameValue,
            family_name: authorUpdateFormFamilyNameValue,
            birthDate: authorUpdateFormBirthValue,
            deathDate: authorUpdateFormDeathValue
        }
        if ((initialFirstName === updatedAuthorData.first_name) && (initialLastName === updatedAuthorData.family_name)) {
            updateAuthorNoNameCheck(updatedAuthorData);
        } else {
            updateAuthorNameCheck(updatedAuthorData);
        }
        //console.log(JSON.stringify(updatedAuthorData));    }
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

    async function duplicateAuthorUpdateWarningSubmitHandler(event) {
        event.preventDefault();
        const updatedAuthorData = {
            first_name: authorUpdateFormFirstNameValue,
            family_name: authorUpdateFormFamilyNameValue,
            birthDate: authorUpdateFormBirthValue,
            deathDate: authorUpdateFormDeathValue
        }
        //console.log(JSON.stringify(updatedAuthorData));
        updateAuthorNoNameCheck(updatedAuthorData);
    }

    function authorDuplicateWarningCancelButtonHandler() {
        setDisplayDuplicateWarning(false);
    }
    
    return <div className={styles.popup}>
        <div className={styles.popupInner}>
            {!displayDuplicateWarning && <form onSubmit={authorUpdateFormSubmitHandler}>
                <label>First Name<input type='text' name='authorUpdateFormFirstNameInput' value={authorUpdateFormFirstNameValue} onChange={authorUpdateFormFirstNameChangeHandler}/></label>
                <label>Family Name<input type='text' name='authorUpdateFormFamilyNameInput' value={authorUpdateFormFamilyNameValue} onChange={authorUpdateFormFamilyNameChangeHandler}/></label>
                <label>Date of Birth<input type='date' name='authorUpdateFormBirthInput' value={authorUpdateFormBirthValue} onChange={authorUpdateFormBirthDateChangeHandler}/></label>
                <label>Date of Death<input type='date' name='authorUpdateFormDeathInput'value={authorUpdateFormDeathValue} onChange={authorUpdateFormDeathDateChangeHandler}/></label>
                <div id={styles.button_div}>
                    <button type="submit">Update Author</button>
                    <button className='close-button' id={styles.right_most_button} onClick={popupForUpdateCloseButtonHandler}>Close</button>
                </div>
            </form>}
            {displayDuplicateWarning && (
                <form onSubmit={duplicateAuthorUpdateWarningSubmitHandler}>
                    <p>An author named {`${authorUpdateFormFirstNameValue} ${authorUpdateFormFamilyNameValue}`} already exists in the database. Are you sure you want to update this author to have that name?</p>
                    <button type='submit'>Update</button>
                    <button id={styles.right_most_button} onClick={authorDuplicateWarningCancelButtonHandler}>Cancel</button>
                </form>
            )}
        </div>
    </div>
}

export default AuthorPopupForUpdate;