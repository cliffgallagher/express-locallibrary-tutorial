import React, { useEffect, useState } from 'react';
import '../Popup.css';

const BookPopupForUpdate = (props) => {
    const [updateFormAuthorOptions, setUpdateFormAuthorOptions] = useState([]);
    const [updateFormGenreOptions, setUpdateFormGenreOptions] = useState([])
    const [updateFormTitleInput, setUpdateFormTitleInput] = useState();
    const [updateFormISBNInput, setUpdateFormISBNInput] = useState();
    const [updateFormSummaryInput, setUpdateFormSummaryInput] = useState();
    const [updateFormAuthorInput, setUpdateFormAuthorInput] = useState();
    const [updateFormGenreInput, setUpdateFormGenreInput] = useState();
    const [displayDuplicateWarning, setDisplayDuplicateWarning] = useState(false);

    //console.log("rendered BookPOpupForUpdate");

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

    const getGenresFromDatabase = async () => {
        const genresResponse = await fetch('/catalog/genres');
        const genreObjectArray = await genresResponse.json();
        setUpdateFormGenreOptions(() => {
            return [genreObjectArray.map(element => <option key={element.genre_id} value={element.genre_id}>{element.name}</option>)];
        })   
    }
    
    async function fetchBook() {
        try {
            //console.log("bookID in BookPopupForUpdate: " + props.bookID);
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
        //console.log("book ID is: " + props.bookID);
        fetchBook();
        await getAuthorsFromDatabase();
        setUpdateFormAuthorInput(props.authorID);
        await getGenresFromDatabase();
        setUpdateFormGenreInput(props.genreID);

    }, []);

    async function popupForUpdateSubmitHandler(event) {
        event.preventDefault();
        const updatedBookInfo = {
            title: updateFormTitleInput,
            authorID: updateFormAuthorInput,
            isbn: updateFormISBNInput,
            genreID: updateFormGenreInput,
            summary: updateFormSummaryInput
        }

        const updateBook = async () => {
            //console.log("entered updateBook");
            const response = await fetch(`catalog/book/${props.bookID}/update/one`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookInfo)
            });
            const data = await response.json();
            //console.log("data in popupforupdate: " + data);
            if (data === "title already present in database") {
                setDisplayDuplicateWarning(true);
            } else {
                props.setDisplayBookPopupForUpdate(false);
                props.getBookList();
                return response;
            }
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

    function updateFormGenreInputChangeHandler(event) {
        setUpdateFormGenreInput(event.target.value);
    }

    function updateFormSummaryInputChangeHandler(event) {
        setUpdateFormSummaryInput(event.target.value);
    }

    function popupForUpdateCloseButtonHandler(event) {
        props.setDisplayBookPopupForUpdate(false);
    }

    function duplicateTitleUpdateWarningSubmitHandler(event) {
        event.preventDefault();
        const updatedBookInfo = {
            title: updateFormTitleInput,
            authorID: updateFormAuthorInput,
            isbn: updateFormISBNInput,
            genreID: updateFormGenreInput,
            summary: updateFormSummaryInput
        }

        const updateBook = async () => {
            //console.log("entered updateBook");
            const response = await fetch(`catalog/book/${props.bookID}/update/two`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookInfo)
            });
            setDisplayDuplicateWarning(false);
            props.setDisplayBookPopupForUpdate(false);
            props.getBookList();
            return response;    
        }

        updateBook();
    }

    function duplicateWarningCancelButtonHandler() {
        setDisplayDuplicateWarning(false);
    }

    return <div className='popup'>
        <div className='popup-inner'>
            {!displayDuplicateWarning && <form onSubmit={popupForUpdateSubmitHandler}>
                <label>Title<input type='text' name='updateFormTitleField' value={updateFormTitleInput} onChange={updateFormTitleInputChangeHandler} /></label>
                <label>Author<select name='updateFormAuthorField' value={updateFormAuthorInput} onChange={updateFormAuthorInputChangeHandler}>{updateFormAuthorOptions}</select></label>
                <label>ISBN<input type='text' name='updateFormISBNField' value={updateFormISBNInput} onChange={updateFormISBNInputChangeHandler}/></label>
                <label>Genre<select name='updateFormGenreField' value={updateFormGenreInput} onChange={updateFormGenreInputChangeHandler}>{updateFormGenreOptions}</select></label>
                <label>Summary<input type='text' name='updateFormSummaryField' value={updateFormSummaryInput} onChange={updateFormSummaryInputChangeHandler}/></label>
                <button type="submit">Update Book</button>
                <button className='close-button' onClick={popupForUpdateCloseButtonHandler}>Close</button>
            </form>}
            {displayDuplicateWarning && (
                <form onSubmit={duplicateTitleUpdateWarningSubmitHandler}>
                    <p>A book with the title {updateFormTitleInput} already exists in the database. Are you sure you want to update this book to have that title?</p>
                    <button type='submit'>Update</button>
                    <button onClick={duplicateWarningCancelButtonHandler}>Cancel</button>
                </form>
            )}
        </div>
    </div>
}

export default BookPopupForUpdate;