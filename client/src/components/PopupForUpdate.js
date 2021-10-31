import React, { useEffect, useState } from 'react';
import './PopupForUpdate.css';

const PopupForUpdate = (props) => {
    const [updateFormAuthorOptions, setUpdateFormAuthorOptions] = useState([])
    const [updateFormTitleInput, setUpdateFormTitleInput] = useState("");
    const [updateFormISBNInput, setUpdateFormISBNInput] = useState("");
    const [updateFormSummaryInput, setUpdateFormSummaryInput] = useState("");
    const [updateFormAuthorInput, setUpdateFormAuthorInput] = useState();

    //console.log("bookToUpdate in PopupForUpdate: " + props.bookID);

    const getAuthorsFromDatabase = async () => {
        try {
            const authorsResponse = await fetch('/catalog/authors');
            const authorObjectArray = await authorsResponse.json();
            //console.log('authorList in popup for update: ' + JSON.stringify(authorObjectArray));
            setUpdateFormAuthorOptions(() => {
                return [authorObjectArray.map(element => <option key={element.author_id} value={element.author_id}>{element.family_name + ", " + element.first_name}</option>)];
            }); 
        } catch(e) {
            console.log(e);
        }     
    }
    
    async function fetchBook() {
        try {
            const response = await fetch(`catalog/book/${props.bookID}/update`);
            const bodyOfResponse = await response.json();
            //console.log("bodyOfResponse Update form: " + JSON.stringify(bodyOfResponse));
            setUpdateFormTitleInput(bodyOfResponse[0].title);
            setUpdateFormISBNInput(bodyOfResponse[0].isbn);
            setUpdateFormSummaryInput(bodyOfResponse[0].summary);
            
            
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(async () => {
        //console.log("author ID is: " + props.authorID);
        fetchBook();
        await getAuthorsFromDatabase();
        setUpdateFormAuthorInput(props.authorID);
    }, []);

    async function popupForUpdateSubmitHandler(event) {
        event.preventDefault();
        const updatedBookInfo = {
            title: updateFormTitleInput,
            authorID: updateFormAuthorInput,
            isbn: updateFormISBNInput,
            summary: updateFormSummaryInput
        }

        const updateBook = async () => {
            //console.log("entered updateBook");
            const response = await fetch(`catalog/book/${props.bookID}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookInfo)
            });
            //console.log("have received response from post in PopupForUpdate");
            props.popupForUpdateHandler(false);
            props.getBookListToPopupForUpdate();
            return response;
        }

        updateBook();
    }
    
    function updateFormTitleInputChangeHandler(event) {
        setUpdateFormTitleInput(event.target.value);
    }

    function updateFormAuthorInputChangeHandler(event) {
        setUpdateFormAuthorInput(event.target.value);
    }

    function updateFormISBNInputChangeHandler(event) {
        setUpdateFormISBNInput(event.target.value);
    }

    function updateFormSummaryInputChangeHandler(event) {
        setUpdateFormSummaryInput(event.target.value);
    }

    function popupForUpdateCloseButtonHandler(event) {
        props.popupForUpdateHandler(false);
    }

    return <div className='popup'>
        <div className='popup-inner'>
            <form onSubmit={popupForUpdateSubmitHandler}>
                <label>Title<input type='text' name='updateFormTitleField' value={updateFormTitleInput} onChange={updateFormTitleInputChangeHandler} /></label>
                <label>Author<select name='updateFormAuthorField' value={updateFormAuthorInput} onChange={updateFormAuthorInputChangeHandler}>{updateFormAuthorOptions}</select></label>
                <label>ISBN<input type='text' name='updateFormISBNField' value={updateFormISBNInput} onChange={updateFormISBNInputChangeHandler}/></label>
                <label>Summary<input type='text' name='updateFormSummaryField' value={updateFormSummaryInput} onChange={updateFormSummaryInputChangeHandler}/></label>
                <button type="submit">Update Book</button>
                <button className='close-button' onClick={popupForUpdateCloseButtonHandler}>Close</button>
            </form>
        </div>
    </div>
}

export default PopupForUpdate;