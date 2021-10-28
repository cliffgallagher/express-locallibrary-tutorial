import React, { useEffect, useState } from 'react';
import './PopupForUpdate.css';

const PopupForUpdate = (props) => {
    const [updateFormTitleInput, setUpdateFormTitleInput] = useState("");
    const [updateFormISBNInput, setUpdateFormISBNInput] = useState("");
    const [updateFormSummaryInput, setUpdateFormSummaryInput] = useState("");

    //console.log("bookToUpdate in PopupForUpdate: " + props.bookID);

    async function fetchBook() {
        try {
            const response = await fetch(`catalog/book/${props.bookID}/update`);
            const bodyOfResponse = await response.json();
            setUpdateFormTitleInput(bodyOfResponse[0].title);
            setUpdateFormISBNInput(bodyOfResponse[0].isbn);
            setUpdateFormSummaryInput(bodyOfResponse[0].summary);
            
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchBook();
    }, []);

    async function popupForUpdateSubmitHandler(event) {
        event.preventDefault();
        
    }
    
    function updateFormTitleInputChangeHandler(event) {
        setUpdateFormTitleInput(event.target.value);
    }

    function updateFormISBNInputChangeHandler(event) {
        setUpdateFormISBNInput(event.target.value);
    }

    function updateFormSummaryInputChangeHandler(event) {
        setUpdateFormSummaryInput(event.target.value);
    }

    function popupForUpdateCancelButtonHandler(event) {
        props.popupForUpdateHandler(false);
    }

    return <div className='popup'>
        <div className='popup-inner'>
            <form onSubmit={popupForUpdateSubmitHandler}>
                <label>Title<input type='text' name='updateFormTitleField' value={updateFormTitleInput} onChange={updateFormTitleInputChangeHandler} /></label>
                <label>ISBN<input type='text' name='updateFormISBNField' value={updateFormISBNInput} onChange={updateFormISBNInputChangeHandler}/></label>
                <label>Summary<input type='text' name='updateFormSummaryField' value={updateFormSummaryInput} onChange={updateFormSummaryInputChangeHandler}/></label>
                <button type="submit">Update Book</button>
                <button className='close-button' onClick={popupForUpdateCancelButtonHandler}>Cancel</button>
            </form>
            {props.children}
        </div>
    </div>
}

export default PopupForUpdate;