import React, { useEffect, useState, useContext } from 'react';
//import '../Popup.css';
import styles from '../ElementPopupForUpdate.module.css';
import {AuthContext} from '../../context/auth-context';

const BookPopupForUpdate = (props) => {
    const [updateFormAuthorOptions, setUpdateFormAuthorOptions] = useState([]);
    const [updateFormGenreOptions, setUpdateFormGenreOptions] = useState([])
    const [updateFormTitleInput, setUpdateFormTitleInput] = useState();
    const [updateFormISBNInput, setUpdateFormISBNInput] = useState();
    const [updateFormSummaryInput, setUpdateFormSummaryInput] = useState();
    const [updateFormAuthorInput, setUpdateFormAuthorInput] = useState();
    const [updateFormGenreInput, setUpdateFormGenreInput] = useState();
    const [displayDuplicateWarning, setDisplayDuplicateWarning] = useState(false);
    const [initialTitle, setInitialTitle] = useState();
    const [validationErrors, setValidationErrors] = useState();
    const auth = useContext(AuthContext);
    //console.log("rendered BookPOpupForUpdate");

    const getAuthorsFromDatabase = async () => {
        try {
            const authorsResponse = await fetch('/catalog/authors', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const authorObjectArray = await authorsResponse.json();
            if (typeof authorObjectArray === 'object') {
                if (authorObjectArray.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            //console.log('authorList in popup for update: ' + JSON.stringify(authorObjectArray));
            setUpdateFormAuthorOptions(() => {
                return [authorObjectArray.map(element => <option key={element.author_id} value={element.author_id}>{element.family_name + ", " + element.first_name}</option>)];
            }); 
        } catch(e) {
            console.log(e);
        }     
    }

    const getGenresFromDatabase = async () => {
        const genresResponse = await fetch('/catalog/genres', {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        const genreObjectArray = await genresResponse.json();
        if (typeof genreObjectArray === 'object') {
            if (genreObjectArray.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
        }
        setUpdateFormGenreOptions(() => {
            return [genreObjectArray.map(element => <option key={element.genre_id} value={element.genre_id}>{element.name}</option>)];
        })   
    }
    
    async function fetchBook() {
        try {
            //console.log("bookID in BookPopupForUpdate: " + props.bookID);
            const response = await fetch(`catalog/book/${props.bookID}/update`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const bodyOfResponse = await response.json();
            if (typeof bodyOfResponse === 'object') {
                if (bodyOfResponse.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            //console.log("bodyOfResponse Update form: " + JSON.stringify(bodyOfResponse));
            setUpdateFormTitleInput(bodyOfResponse[0].title);
            setUpdateFormISBNInput(bodyOfResponse[0].isbn);
            setUpdateFormSummaryInput(bodyOfResponse[0].summary);
            //setUpdateFormSummaryInput("Here is some static text");
            setInitialTitle(bodyOfResponse[0].title);
            
        } catch(e) {
            console.log(e);
        }
    }

    const updateBookWithTitleCheck = async (updatedBookInfo) => {
        //console.log("entered updateBook");
        const response = await fetch(`catalog/book/${props.bookID}/update/one`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(updatedBookInfo)
        });
        const data = await response.json();
        /*
        if (errorMessages.includes("title already in database")) {
            setDisplayDuplicateWarning(true);
        } else {
            props.setDisplayBookPopupForUpdate(false);
            props.getBookList();
            return response;
        }*/
        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
            if (data.hasOwnProperty('errors')) {
                //console.log("data.errors: " + JSON.stringify(data.errors));
                const errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.includes("title already in database")) {
                    setDisplayDuplicateWarning(true);
                } else {
                    //console.log("errorMessages: " + JSON.stringify(errorMessages));
                    setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                    });
                }
                //console.log("errorMessages: " + JSON.stringify(errorMessages));
            } else {
                props.getBookList();
                props.setDisplayElementPopupForUpdate(false);
                props.setDisplayElement(false);
                props.setHideElement(false);

                return response;
            }
        }
    }

    const updateBookNoTitleCheck = async (updatedBookInfo) => {
        console.log("entered updateBookNoTitleCheck");
        const response = await fetch(`catalog/book/${props.bookID}/update/two`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(updatedBookInfo)
        });
        /*setDisplayDuplicateWarning(false);
        props.setDisplayBookPopupForUpdate(false);
        props.getBookList();
        return response; */
        const data = await response.json();
        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
            if (data.hasOwnProperty('errors')) {
                //console.log("data.errors: " + JSON.stringify(data.errors));
                const errorMessages = data.errors.map(element => element.msg);
                setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                });
                
                //console.log("errorMessages: " + JSON.stringify(errorMessages));
            } else {
                props.getBookList();
                props.setDisplayElementPopupForUpdate(false);
                props.setDisplayElement(false);
                props.setHideElement(false);

            }
        }   
    }

    useEffect(async () => {
        //console.log("inside useEffect");
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
        //console.log('updatedBookInfo: ' + JSON.stringify(updatedBookInfo));
        //console.log("initialTitle: " + initialTitle + ", updated title: " + updatedBookInfo.title);
        if (initialTitle === updatedBookInfo.title) {
            updateBookNoTitleCheck(updatedBookInfo);
        } else {
            //console.log("entered else block");
            updateBookWithTitleCheck(updatedBookInfo);
        }
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
        props.setDisplayElementPopupForUpdate(false);
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
        updateBookNoTitleCheck(updatedBookInfo);
    }

    function duplicateWarningCancelButtonHandler() {
        setDisplayDuplicateWarning(false);
    }

    return <div className={styles.popup}>
        <div >
            {!displayDuplicateWarning && <form className={styles.popupInner} onSubmit={popupForUpdateSubmitHandler}>
                <ul>{validationErrors}</ul>
                <label>Title<input type='text' name='updateFormTitleField' value={updateFormTitleInput} onChange={updateFormTitleInputChangeHandler} /></label>
                <label>Author<select name='updateFormAuthorField' value={updateFormAuthorInput} onChange={updateFormAuthorInputChangeHandler}>{updateFormAuthorOptions}</select></label>
                <label>ISBN<input type='text' name='updateFormISBNField' value={updateFormISBNInput} onChange={updateFormISBNInputChangeHandler}/></label>
                <label>Genre<select name='updateFormGenreField' value={updateFormGenreInput} onChange={updateFormGenreInputChangeHandler}>{updateFormGenreOptions}</select></label>
                <label>Summary<textarea id={styles.summary_input} name='updateFormSummaryField' value={updateFormSummaryInput} rows="5" cols="25" onChange={updateFormSummaryInputChangeHandler}></textarea></label>
                <div id={styles.button_div}>
                    <button type="submit">Update Book</button>
                    <button className='close-button' onClick={popupForUpdateCloseButtonHandler} id={styles.right_most_button}>Close</button>
                </div>
            </form>}
            {displayDuplicateWarning && (
                <form className={styles.popupInner} onSubmit={duplicateTitleUpdateWarningSubmitHandler}>
                    <p>A book with the title {updateFormTitleInput} already exists in the database. Are you sure you want to update this book to have that title?</p>
                    <div id={styles.button_div}>
                        <button type='submit'>Update</button>
                        <button id={styles.right_most_button} onClick={duplicateWarningCancelButtonHandler}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    </div>
}

export default BookPopupForUpdate;